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
    // loop 5 times
    for (let i = 0; i < 5; i++) {
        let page = await browser.newPage();
        console.log(`Navigating to ${url}...`);
        // set the HTTP Basic Authentication credential
        await page.authenticate({'username': user, 'password': password });
        await page.goto(url);
        // Wait for the required DOM to be rendered
		    await page.waitForSelector('a.pagination-nav__link--next');
		    // Get the link to all the required books
		    url = await page.$eval('a.pagination-nav__link--next', link => {
			      // Extract the links from the data
			      link = link.href;
			      return link;
		    });
        let title = await page.$eval('header > h1', text => text.textContent);
        console.log(title)
    }
	}
}

module.exports = scraperObject;
