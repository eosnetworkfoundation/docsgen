const fs = require('fs');
const pageScraper = require('./pageScraper');
const linksScraper = require('./getLinks');
const lib = require('./scraperLibrary');
const algoliasearch = require('algoliasearch')
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
	// crawler properties
	var url = properties.get('main.url');
	const domain = properties.get('main.domain');
	const user = properties.get('main.app.user');
	const password = properties.get('main.app.password');
	// search properties
	const publicApiKey = properties.get('algolia.publicApiKey');
	const privateApiKey = properties.get('algolia.privateApiKey');
	const appId = properties.get('algolia.appId');
	const indexName = properties.get('algolia.indexName');

	try {
		browser = await browserInstance;

		// Connect and authenticate with your Algolia app
		const client = algoliasearch(appId, privateApiKey)
		const algoliaIndex = client.initIndex(indexName)

		let links = await linksScraper.scrapeLinks(browser, url, domain, user, password);
		let map = {};
		//let loop=0;
		for (var i in links) {
			//loop++;
			//if (loop >3) { break; }
			// skip over external links
			if (! lib.isInternalLink(url, domain)) { continue; }
			// build up a sensible object-id
			objId = lib.createObjId(links[i],domain, map);
			let data = await pageScraper.scraper(browser, links[i], objId, domain, user, password);
			data['url'] = links[i];
			data['url_without_anchor'] = links[i];
			data['anchor'] = "Document";
			tags = ["leap","dune","system-contracts","cdt","swift-sdk","eosjs"];
			data['docusaurus_tag'] = lib.getDocusuarusTag(links[i],domain, tags);
			data['language'] = lib.getLanguageCode(links[i],domain) || "en";

			recordName = "./records/"+lib.urlToRecordName(links[i]);
			let jsonDoc = JSON.stringify(data);
			fs.writeFile(recordName, jsonDoc, 'utf8', function(err) {
				if(err) {
					return console.log(err);
				}
				console.log(`The data has been scraped and saved successfully! View it at '${recordName}'`);
			});

			console.log("about to save ",jsonDoc);
			algoliaIndex.saveObject(data).then(() => {
  			console.log("Saved object with id ", data['objectID'] );
			}).catch((err) => {
     		console.error(err);
			});

		}
	} catch(err) {
		console.log("error ", err);
	} finally {
		await browser.close();
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
