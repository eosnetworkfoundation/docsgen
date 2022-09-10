const fs = require('fs');
const pageScraper = require('./pageScraper');
const linksScraper = require('./getLinks');
const lib = require('./scraperLibrary');
async function scrapeAll(browserInstance){
	let browser;

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
	const domain = properties.get('main.domain');
	const user = properties.get('main.app.user');
	const password = properties.get('main.app.password');

	try{
		browser = await browserInstance;
		let links = await linksScraper.scrapeLinks(browser, url, domain, user, password);
		let loop=0;
		for (var i in links) {
			loop++;
			if (loop >3) { break; }
			// skip over external links
			if (! lib.isInternalLink(url, domain)) { continue; }
			let data = await pageScraper.scraper(browser, links[i], domain, user, password);
			data['url'] = links[i];
			data['parentId'] = lib.getParentId(links[i],domain);
			data['parentName'] = lib.getParentName(data['parentId'])
			if (lib.isCodedocs(links[i])) {
				data['type'] = "codedocs";
			} else {
				data['type'] = "manual";
			}
			recordName = "./records/"+lib.urlToRecordName(links[i]);
			fs.writeFile(recordName, JSON.stringify(data), 'utf8', function(err) {
				if(err) {
					return console.log(err);
				}
				console.log(`The data has been scraped and saved successfully! View it at '${recordName}'`);
			});
		}
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	} finally {
		 await browser.close();
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
