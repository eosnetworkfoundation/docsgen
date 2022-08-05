import scrapy

# for error handling
from scrapy.spidermiddlewares.httperror import HttpError
from twisted.internet.error import DNSLookupError
from twisted.internet.error import TimeoutError, TCPTimedOutError

class DocsCheckSpider(scrapy.Spider):
    name="docscheck"

    def __init__(self, search_urls="localtest", *args, **kwargs):
        super(DocsCheckSpider, self).__init__(*args, **kwargs)
        self.localtest = [
            'http://localhost:39999/eosdocs/',
        ]
        self.production = [
            'http://docs.eosnetwork.com/eosdocs/',
            'http://docs.eosnetwork.com/reference/',
        ]
        self.integration = [
            'http://beta.docs.eosnetwork.com/eosdocs/',
            'http://beta.docs.eosnetwork.com/reference/',
        ]

        self.urls = self.localtest
        if search_urls == "production":
            self.urls = self.production
        if search_urls == "integration":
            self.urls = self.integration

    # ##########################
    # Start here kickoff urls from init
    # ##########################
    def start_requests(self):
        for url in self.urls:
            yield scrapy.Request(url=url, callback=self.parse,
                                          errback=self.error)


    # ##########################
    # extract links and follow
    # ##########################
    def parse(self, response):
        for href in self.extract_links(response):
            print ("*****Working on " + href)
            if self.is_eos(href): # and self.is_crawlable(href):
                yield response.follow(href, callback=self.parse,
                        errback=self.error)

    # ###########################
    # should we follow this link
    # position 3 is the repro group
    #############################
    def is_eos(self, url):
        is_absolute = True if '//' in url else False
        is_in_eos = False

        # if absolute URL we need another check
        if is_absolute:
            url = self.trailing_slash(url)
            # use join to marshel into string, not array
            key_path = "".join(url.split("/")[3:4])
            is_root_url = url in self.urls
            is_in_eos = key_path == "eosdocs" or key_path == "reference" or is_root_url
        else:
            # relative urls considered to be in network
            is_in_eos = True

        if is_in_eos:
            print("FOUND "+url)
        else:
            print("NO GO "+url)
        return is_in_eos

    # ###########################
    # look at file extenstion restricting to html, md, and no extension
    #############################
    def is_crawlable(self, url):
        file_path = self.file_path(url)
        extension = file_path.rsplit(".",1)[-1]

        # handle the case with no extension
        if extension == file_path:
            extension = "none"
            return True

        # handle the case with md or html extension
        if extension == "md" or extension == "html":
            return True

        # no valid extension
        return False

    # ##########################
    # build report when HTTP error is encortered
    # ##########################
    def error(self, failure):
        if failure.check(HttpError):
            # these exceptions come from HttpError spider middleware
            # you can get the non-200 response
            response = failure.value.response
            # this is the referer URL
            referer_url = response.request.headers.get('Referer').decode("utf-8")
            yield {
                'error_url': response.url,
                'page_url' : referer_url
            }

        elif failure.check(DNSLookupError):
            # this is the original request
            request = failure.request
            self.logger.error('DNSLookupError on %s', request.url)

        elif failure.check(TimeoutError, TCPTimedOutError):
            # this is the original request
            request = failure.request
            self.logger.error('TimeoutError on %s', request.url)

    # ##########################
    # pull out links from markdown skip github boilerplate
    # ##########################
    def extract_links(self, response):
        return response.css('a::attr(href)').getall()

    # ##########################
    # ensure url has trailing /
    # ##########################
    def trailing_slash(self, url):
        if url[-1] != "/":
            url = url + "/"
        return url
