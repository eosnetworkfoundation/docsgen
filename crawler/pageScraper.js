const crypto = require('crypto');

const scraperObject = {
	  async scraper(browser, link, domain, user, password){
			/**
			 * Scape a Single Page given a URL
			 * Waits for 'article' tag
			 * Get lists from div.navbar-sidebar__items
			 * Pulls out href value for a.menu__link
			 * Returns a list of URLS
			 *
			 * Promise async because puppeteer functions async
			 * @param link - the page to scrape
			*/
			let pagePromise = (link) => new Promise(async(resolve, reject) => {
				try {
					let pageData = {};
					let hierarchy = {};
					let weight = {
						"pageRank" : 100,
						"level" : 100,
        		"position" : 100
					};
					let lvl1 = [];
					let lvl2 = [];
					let lvl3 = [];
					let lvl4 = [];
					let lvl5 = [];
					let lvl6 = [];
					let content = "";

					let page = await browser.newPage();
					console.log(`Navigating to ${link}...`);
					// set the HTTP Basic Authentication credential
					await page.authenticate({'username': user, 'password': password });
					await page.goto(link);
					// Wait for the required DOM to be rendered
					await page.waitForSelector('article');
					// All H1 Tags includes title
					lvl1 = await page.$$eval( 'h1', lvl1 => {
						lvl1 = lvl1.map(el => el.textContent);
						return lvl1;
					});
					// required by algoria search
					hierarchy['lvl1'] = lvl1.join(" ") || "";
					// get the title as first H1
					if ( Array.isArray(lvl1) && lvl1.length > 0 ) {
						hierarchy['lvl0'] = lvl1[0] || "Documentation" ;
					} else {
						// default
						hierarchy['lvl0'] = "Documentation";
					}
					// All H2 Tags
					lvl2 = await page.$$eval( 'h2', lvl2 => {
						lvl2 = lvl2.map(el => el.textContent);
						return lvl2;
					});
					hierarchy['lvl2'] = lvl2.join(" ") || "";
					// All H3 Tags
					lvl3 = await page.$$eval( 'h3', lvl3 => {
							lvl3 = lvl3.map(el => el.textContent);
							return lvl3;
					});
					hierarchy['lvl3'] = lvl3.join(" ") || "";
					// content
					content = await page.$eval( 'article', content => {
							content = content.innerText;
							// replace end of lines
							content = content.replace(/(?:\r\n|\r|\n)/g, ' ');

							return content;
					});
					hierarchy['lvl4'] = lvl4.join(" ") || "";
					hierarchy['lvl5'] = lvl5.join(" ") || "";
					hierarchy['lvl6'] = lvl6.join(" ") || "";
					pageData['content'] = content || "";
					pageData['objectID'] = crypto.randomUUID();
					pageData['hierarchy'] = hierarchy;
					pageData['weight'] = weight;
					resolve(pageData);
					await page.close();
				}  catch (e) {
					return reject(e);
				}
			});

    return pagePromise(link);

	}
}

module.exports = scraperObject;
