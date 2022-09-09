// init prop reader object
const propertiesReader = require('properties-reader');
// init argument parser
const arguments = require('./arguments');
// get env file
let property_file_name = arguments.parse();
console.log(`opening prop file ${property_file_name}`)
// get the properties
const properties = propertiesReader(property_file_name);
// set properties
var url = properties.get('main.url');
const user = properties.get('main.app.user');
const password = properties.get('main.app.password');

const scraperObject = {
	async scraper(browser){
    let linksPromise = (url) => new Promise(async(resolve, reject) => {
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
    });

    let pagePromise = (link) => new Promise(async(resolve, reject) => {
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
    });

    // loop 5 times
    let links = await linksPromise(url);
    for (i in links) {
        let data = await pagePromise(links[i]);
        console.log(data['title']);
    }
	}
}

module.exports = scraperObject;
