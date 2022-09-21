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
	const domain = properties.get('main.domain');
	const exclude = properties.get('main.exclude').split(',');
	console.log("Excluding: " + exclude);
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


		let links = await linksScraper.scrapeLinks(domain, exclude);
		//links = ['https://docs.eosnetwork.com/leap-plugins/latest/chain.api/', 'https://docs.eosnetwork.com/leap-plugins/latest/producer.api/', 'https://docs.eosnetwork.com/leap-plugins/latest/net.api/', 'https://docs.eosnetwork.com/leap-plugins/latest/db_size.api/', 'https://docs.eosnetwork.com/leap-plugins/latest/trace.api/']
		//console.log(links);
		let map = {};
		for (var i in links) {
			// skip over external links
			if (! lib.isInternalLink(links[i], domain)) { continue; }
			// build up a sensible object-id
			objId = lib.createObjId(links[i],domain, map);
			let data = await pageScraper.scraper(browser, links[i], objId, domain);
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
