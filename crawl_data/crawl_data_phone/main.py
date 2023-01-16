from twisted.internet import reactor, defer
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from scrapy.utils.project import get_project_settings
from crawl_data_phone.spiders.DiDongThongMinh import DiDongThongMinhSpider
from crawl_data_phone.spiders.HNamMobile import HNamMobileSpider
from crawl_data_phone.spiders.DiDongViet import DiDongVietSpider
def main():
    settings = get_project_settings()
    configure_logging(settings)
    runner = CrawlerRunner(settings)

    @defer.inlineCallbacks
    def crawl():
        # yield runner.crawl(DiDongThongMinhSpider)
        # yield runner.crawl(HNamMobileSpider)
        yield runner.crawl(DiDongVietSpider)
        reactor.stop()

    crawl()
    reactor.run() # the script will block here until the last crawl call is finished

if __name__ == "__main__":
    main()
