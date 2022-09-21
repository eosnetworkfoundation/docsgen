const Sitemapper = require('sitemapper');


const linksObject = {
  async scrapeLinks(domain, exclude){



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
        const sitemap = new Sitemapper();
        let sitemapurl = "https://" + domain +"/sitemap.xml";
        sitemap.fetch(sitemapurl).then(function(sites) {
          var links = [];
          for (u in sites.sites) {
            var ok = true;
            for (x in exclude) {
              if (sites.sites[u].includes(domain + "/" + exclude[x].trim())) {
                ok = false;
              }
            }
            if (ok) { links.push(sites.sites[u]); }
          }
          resolve(links);
        });
			}  catch (e) {
					return reject(e);
			}
		});

      // get links and iterate through them
      return linksPromise();
    }
}

module.exports = linksObject;
