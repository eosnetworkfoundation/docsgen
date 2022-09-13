const linksObject = {
  async scrapeLinks(browser, url, domain, user, password){
		/**
		 * Get all the links to scrape starts from provided URL
		 * Waits for 'article' tag
		 * Get lists from div.navbar-sidebar__items
		 * Pulls out href value for a.menu__link
		 * Returns a list of URLS
		 *
		 * As an alternative could use sitemap for list of links
		 *
		 * Promise async because puppeteer functions async
		 * @param url - page with all the links
		*/
		let linksPromise = () => new Promise(async(resolve, reject) => {
			try {
				let links = [];
				let linkPage = await browser.newPage();
				// set the HTTP Basic Authentication credential
				await linkPage.authenticate({'username': user, 'password': password });
				await linkPage.goto(url);
				// Wait for the required DOM to be rendered
				await linkPage.waitForSelector('article');
				links = await linkPage.$$eval(
					'div.navbar-sidebar__items > div:nth-child(2) > ul > li',
					(links) => {
						// filter out links containing '#'
						links = links.filter(link => link.querySelector('a.menu__link').href.indexOf("#") === -1);
						// array of links
						links = links.map(el => el.querySelector('a.menu__link').href);
						return links;
					});
					resolve(links);
					await linkPage.close();
				}  catch (e) {
					return reject(e);
				}
			});

      // get links and iterate through them
      return linksPromise();
    }
}

module.exports = linksObject;
