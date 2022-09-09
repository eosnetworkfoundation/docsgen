// init prop reader object
const propertiesReader = require('properties-reader');
// init argument parser
const envArguments = require('./arguments');
// get env file
let property_file_name = envArguments.parse();
console.log(`opening prop file ${property_file_name}`)
// get the properties
const properties = propertiesReader(property_file_name);
// set properties
var url = properties.get('main.url');
const user = properties.get('main.app.user');
const password = properties.get('main.app.password');
const domain = properties.get('main.domain');

const scraperObject = {
	async scraper(browser){
		let linksPromise = (url) => new Promise(async(resolve, reject) => {
			try {
				let links = [];
				let linkPage = await browser.newPage();
				// set the HTTP Basic Authentication credential
				await linkPage.authenticate({'username': user, 'password': password });
				await linkPage.goto(url);
				// Wait for the required DOM to be rendered
				await linkPage.waitForSelector('article');
				// Get the link to all articles
				let html = await linkPage.$eval('div.navbar-sidebar__items > div:nth-child(2) > ul > li > div > a.menu__link', el => el.href);
				console.log(html);
				links = await linkPage.$$eval(
					'div.navbar-sidebar__items > div:nth-child(2) > ul > li',
					links => {
						// filter our '#' strings
						links = links.filter(link => link.querySelector('a.menu__link').href.indexOf("#") === -1)
						// array of links
						links = links.map(el => el.querySelector('a.menu__link').href)
						return links;
					});
					resolve(links);
					await linkPage.close();
				}  catch (e) {
					return reject(e);
				}
			});

			let pagePromise = (link) => new Promise(async(resolve, reject) => {
				try {
					let pageData = {};
					let page = await browser.newPage();
					console.log(`Navigating to ${link}...`);
					// set the HTTP Basic Authentication credential
					await page.authenticate({'username': user, 'password': password });
					await page.goto(link);
					// Wait for the required DOM to be rendered
					await page.waitForSelector('article');
					pageData['title'] = await page.$eval('h1', text => text.textContent);
					resolve(pageData);
					await page.close();
				}  catch (e) {
					return reject(e);
				}
			});

		function getParentId(url) {
			var path = url.substring(url.indexOf(domain)+domain.length, url.length)
			// strip off leading slash
			if (path.charAt(0) === "/") { path = path.substring(1,path.length); }
			path = path.substring(0,path.indexOf("/"));
			return path.toLowerCase();
		}

		function getParentName(id) {
			return id.charAt(0).toUpperCase() + id.slice(1);
		}

		function isCodedocs(url) {
			return url.indexOf("reference") > 0
		}

    // get links and iterate through them
    let links = await linksPromise(url);
		let loop=0;
		for (var i in links) {
			loop++;
			if (loop >2) { break; }
			let data = await pagePromise(links[i]);
			data['url'] = links[i];
			data['parentId'] = getParentId(links[i]);
			data['parentName'] = getParentName(data['parentId'])
			if (isCodedocs(links[i])) {
				data['type'] = "codedocs";
			} else {
				data['type'] = "manual";
			}
			console.log(data);
		}
	}
}

module.exports = scraperObject;
