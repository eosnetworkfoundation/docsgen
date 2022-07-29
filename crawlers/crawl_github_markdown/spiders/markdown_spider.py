import scrapy

# for error handling
from scrapy.spidermiddlewares.httperror import HttpError
from twisted.internet.error import DNSLookupError
from twisted.internet.error import TimeoutError, TCPTimedOutError

class MarkdownSpider(scrapy.Spider):
    name="markdown"

    def __init__(self, search_urls="mandel_urls", *args, **kwargs):
        super(MarkdownSpider, self).__init__(*args, **kwargs)
        self.mandel_urls = [
            'https://github.com/eosnetworkfoundation/mandel/blob/main/docs/index.md',
            'https://github.com/eosnetworkfoundation/mandel/blob/main/README.md',
        ]
        self.mandel_cdt_urls = [
            'https://github.com/eosnetworkfoundation/mandel.cdt/blob/master/README.md',
            'https://github.com/eosnetworkfoundation/mandel.cdt/blob/master/docs/index.md',
        ]
        self.mandel_contracts = [
            'https://github.com/eosnetworkfoundation/mandel-contracts/blob/main/docs/index.md',
            'https://github.com/eosnetworkfoundation/mandel-contracts/blob/main/README.md',
        ]

        self.urls = self.mandel_urls
        if search_urls == "mandel_cdt":
            self.urls = self.mandel_cdt_urls
        if search_urls == "mandel_contracts":
            self.urls = self.mandel_contracts

    # ##########################
    # Start here kickoff urls from init
    # ##########################
    def start_requests(self):
        for url in self.urls:
            yield scrapy.Request(url=url, callback=self.parse,
                                          errback=self.error)


    # ##########################
    # extract links in main content and follow
    # ##########################
    def parse(self, response):
        for href in self.markdown_extract_links(response):
            if self.is_eos_repo(href): # and self.is_crawlable(href):
                yield response.follow(href, callback=self.parse,
                        errback=self.error)

    # ###########################
    # should we follow this link
    # position 3 is the repro group
    #############################
    def is_eos_repo(self, url):
        is_absolute = True if '//' in url else False
        is_in_eos_repo = False

        # if absolute URL we need another check
        if is_absolute:
            # use join to marshel into string, not array
            is_in_eos_repo = "".join(url.split("/")[3:4]) == "eosnetworkfoundation"
        else:
            # relative urls considered to be in network
            is_in_eos_repo = True

        return is_in_eos_repo

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
                'repo_name': self.repo_name(referer_url),
                'file_path': self.file_path(referer_url),
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
    # create repo file path from a github url
    # ##########################
    def file_path(self, url):
        components = url.split("/")
        # discard https [] github.com eosnetworkfoundation mandel blob
        # join by _
        return "/".join(components[7:])

    # ##########################
    # create repo name from a github url
    # ##########################
    def repo_name(self, url):
        components = url.split("/")
        # discard https [] github.com eosnetworkfoundation mandel blob
        # join by _
        return "/".join(components[3:5])

    # ##########################
    # pull out links from markdown skip github boilerplate
    # ##########################
    def markdown_extract_links(self, response):
        return response.css('main div#readme a::attr(href)').getall()
