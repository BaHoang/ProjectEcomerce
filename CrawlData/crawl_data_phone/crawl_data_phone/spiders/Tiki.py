import scrapy
import requests
import json
from crawl_data_phone.items import CrawlDataPhoneItem


class TikiSpider(scrapy.Spider):
    name = 'tiki'
    product_id_list = []
    allowed_domains = ['tiki.vn/']
    headers = {"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"}
    number_product = 0

    custom_settings = {
        'DOWNLOAD_DELAY': 1, # 2 seconds of delay
        'RANDOMIZE_DOWNLOAD_DELAY': False,
        'CONCURRENT_REQUESTS' : 32,
        'FEED_EXPORT_ENCODING' : "utf-8",
        'USER_AGENT' :  "Mozilla/5.0",
    }

    def start_requests(self):
        url_page = 'https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&category=1795&page={}&urlKey=dien-thoai-smartphone'
        url_product = 'https://tiki.vn/api/v2/products/{}?platform=web'
            
        i = 1
        while True:
            response = requests.get(url_page.format(i), headers=self.headers)
            if response.status_code != 200:
                break
            products = json.loads(response.text)["data"]
            if len(products) == 0:
                break
            
            for product in products:
                self.product_id_list.append(product["id"])
            
            i += 1
        
        print("================= total product", len(self.product_id_list))

        index = 1    
        for j in self.product_id_list:
            link = url_product.format(j)
            index += 1
            page = (index // 40) + 1 
            yield scrapy.Request(url=link, callback=self.parse, meta={'productId': j})


    def parse(self, response):
        try:
            productId = response.meta.get('productId')
            a  = json.loads(response.text)
            item = CrawlDataPhoneItem()

            # link product
            if a['url_path']  != None:
                item['linkProduct'] = 'https://tiki.vn/' + a['url_path']
            else:
                item['linkProduct'] = None

            # name 
            if a['name']  != None:
                item['name'] = a['name']
            else:
                item['name'] = None
            
            #price_sale
                    
            if a['price'] != None:
                item['priceDiscount'] = a['price']
            else:
                item['priceDiscount'] = None
            # price goc
                
            if a['original_price'] != None:
                item['price'] = a['original_price']
            else:
                item['price'] = None

            # link_image        
            if a['images'][0]['base_url'] != None:
                item['image'] = a['images'][0]['base_url']
            else:
                item['image'] = None
            
            # brand 
                    
            if a['brand']['name'] != None:
                item['brand'] = a['brand']['name']
            else:
                item['brand'] = None

            for temp in a['specifications']:
                if (temp['name'] == 'Content'):
                    for atribute in temp['attributes']:
                        if(atribute["code"] == 'display_type'):
                            item['manHinh'] = atribute["value"]

                        if(atribute["code"] == 'camera_truoc'):
                            item['cameraTruoc'] = atribute['value']

                        if(atribute["code"] == 'camera_sau'):
                            item['cameraSau'] = atribute["value"]

                        if(atribute["code"] == 'chip_set'):
                            item['chipset'] = atribute["value"]

                        if(atribute["code"] == 'ram'):
                            item['ram'] = atribute["value"]

                        if(atribute["code"] == 'rom'):
                            item['rom'] = atribute["value"]

                        if(atribute["code"] == 'battery_capacity'):
                            item['pin'] = atribute["value"] 

            item['numberPage'] = productId  
            self.number_product += 1  
            print ("==================", self.number_product)                            
            yield item   

        except:
            print("An exception occurred")
                    

