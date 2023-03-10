from twisted.internet import reactor, defer
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from scrapy.utils.project import get_project_settings
from CrawlDataPhone.spiders.DiDongThongMinh import DiDongThongMinhSpider
from CrawlDataPhone.spiders.HNamMobile import HNamMobileSpider
from CrawlDataPhone.spiders.DiDongViet import DiDongVietSpider
from CrawlDataPhone.spiders.NguyenKim import NguyenKimSpider
from CrawlDataPhone.spiders.HoangHaMobile import HoangHaMobileSpider
from CrawlDataPhone.spiders.CellphoneS import CellphoneSpider
from CrawlDataPhone.spiders.ClickBuy import ClickBuySpider

def main():
    settings = get_project_settings()
    configure_logging(settings)
    runner = CrawlerRunner(settings)

    @defer.inlineCallbacks
    def crawl():
        yield runner.crawl(DiDongThongMinhSpider)
        yield runner.crawl(HNamMobileSpider)
        yield runner.crawl(DiDongVietSpider)
        yield runner.crawl(NguyenKimSpider)
        yield runner.crawl(HoangHaMobileSpider)
        yield runner.crawl(ClickBuySpider)
        yield runner.crawl(CellphoneSpider)
        reactor.stop()

    crawl()
    reactor.run() # the script will block here until the last crawl call is finished

if __name__ == "__main__":
    main()
