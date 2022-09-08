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
const url = properties.get('main.url');
const user = properties.get('main.app.user');
const password = properties.get('main.app.password');

const scraperObject = {


	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${url}...`);
    // set the HTTP Basic Authentication credential
    await page.authenticate({'username': user, 'password': password });
		await page.goto(url);

	}
}

module.exports = scraperObject;
