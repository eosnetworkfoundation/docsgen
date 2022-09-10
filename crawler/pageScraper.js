
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
					let hierarchy1 = [];
					let hierarchy2 = [];
					let hierarchy3 = [];
					let hierarchy4 = [];
					let content = "";

					let page = await browser.newPage();
					console.log(`Navigating to ${link}...`);
					// set the HTTP Basic Authentication credential
					await page.authenticate({'username': user, 'password': password });
					await page.goto(link);
					// Wait for the required DOM to be rendered
					await page.waitForSelector('article');
					// All H1 Tags includes title
					hierarchy1 = await page.$$eval( 'h1', hierarchy1 => {
						hierarchy1 = hierarchy1.map(el => el.textContent);
						return hierarchy1;
					});
					// get the title as first H1
					if ( Array.isArray(hierarchy1) && hierarchy1.length > 0 ) {
						pageData['title'] = hierarchy1[0];
					} else {
						// default
						pageData['title'] = "";
					}
					pageData['hierarchy1'] = hierarchy1 || [];
					// All H2 Tags
					hierarchy2 = await page.$$eval( 'h2', hierarchy2 => {
						hierarchy2 = hierarchy2.map(el => el.textContent);
						return hierarchy2;
					});
					pageData['hierarchy2'] = hierarchy2 || [];
					// All H3 Tags
					hierarchy3 = await page.$$eval( 'h3', hierarchy3 => {
							hierarchy3 = hierarchy3.map(el => el.textContent);
							return hierarchy3;
					});
					pageData['hierarchy3'] = hierarchy3 || [];
					// content
					content = await page.$eval( 'article', content => {
							content = content.innerText;
							// replace end of lines
							content = content.replace(/(?:\r\n|\r|\n)/g, ' ');

							return content;
					});
					pageData['content'] = content || "";
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
