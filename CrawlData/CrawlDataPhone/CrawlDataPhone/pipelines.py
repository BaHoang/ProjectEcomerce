# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymongo
import sys
from CrawlDataPhone.items import CrawlDataPhoneItem

class CrawlDataPhonePipeline:
 
    collection = 'data_phone_items_two'
    mongodb_uri = 'mongodb+srv://hoang:hoang@cluster0.vwzhu.mongodb.net/?retryWrites=true&w=majority'
    mongodb_db = 'data_phone_db'

    # def __init__(self, mongodb_uri, mongodb_db):
    #     self.mongodb_uri = mongodb_uri
    #     self.mongodb_db = mongodb_db
    #     if not self.mongodb_uri: sys.exit("You need to provide a Connection String.")

    # @classmethod
    # def from_crawler(cls, crawler):
    #     return cls(
    #         mongodb_uri=crawler.settings.get('MONGODB_URI'),
    #         mongodb_db=crawler.settings.get('MONGODB_DATABASE', 'items')
    #     )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongodb_uri)
        self.db = self.client[self.mongodb_db]
        # Start with a clean database
        # self.db[self.collection].delete_many({})

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        data = dict(CrawlDataPhoneItem(item))
        self.db[self.collection].insert_one(data)
        return item

#scrapy crawl -s MONGODB_URI="mongodb+srv://hoang:hoang@cluster0.vwzhu.mongodb.net/?retryWrites=true&w=majority" -s MONGODB_DATABASE="data_phone_db" DiDongThongMinh
