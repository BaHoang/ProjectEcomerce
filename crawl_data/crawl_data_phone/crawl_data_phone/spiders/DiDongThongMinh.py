import scrapy
import requests
from crawl_data_phone.items import CrawlDataPhoneItem
from scrapy.selector import Selector
import json
from lxml import html

class DiDongThongMinhSpider(scrapy.Spider):
    name = 'DiDongThongMinh'
    link_products = []
    total = 0

    custom_settings = {
        'USER_AGENT' :  "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        'CONCURRENT_REQUESTS' : 32,
        
    }

    def start_requests(self):     
            pagecurrent = 0

            while True:
                response = requests.get(f'https://didongthongminh.vn/index.php?module=products&view=cat&task=fetch_pages&raw=1&pagecurrent={pagecurrent}&filter=tinh-trang%3Dhang-moi&cid=1&order=&status=')
                if response.text == '':
                    break
                pagecurrent = json.loads(response.text)["totalCurrent"]
                tree = html.fromstring(json.loads(response.text)["content"])
                for url in tree.xpath('//div[@class="col-sm-5ths"]/div[@class="frame cat_item"]/a/@href'):
                    self.link_products.append(url)

            print("===========", len(self.link_products))

            for i in range(len(self.link_products)):
                yield scrapy.Request(
                    url=self.link_products[i], 
                    callback=self.parse,
                    cb_kwargs=dict(link_product=self.link_products[i]),
                )

    def parse(self, response, link_product):
        try:
            name = Selector(response).xpath('//h1[@class="pull-left"]/text()').get()
            brand = Selector(response).xpath('//div[@class="breadcrumbs"]//div[@class="fl-left"]/a/@title').getall()
            manHinh = operating = chipset = ram = rom = pin = cameraTruoc = cameraSau = None
            config = Selector(response).xpath('//table[@class="charactestic_table"]/tr')
                        
            for ele in config:
                name_config = ele.xpath('td/text()').getall()[0].replace('\r', '').replace('\n', '').strip()
                detail_config = ele.xpath('td/text()').getall()[1].replace('\r', '').replace('\n', '').strip()
              
                # man hinh
                if name_config == "Màn hình rộng":
                    manHinh = detail_config                    
                # operating
                elif name_config == "Hệ điều hành":
                    operating = detail_config                           
                # chipSet
                elif name_config == "Chip xử lý":
                    chipset = detail_config                     
                # ram
                elif name_config == "RAM":
                    ram = detail_config               
                # rom
                elif name_config == "Bộ nhớ trong":
                    rom = detail_config                
                # pin
                elif name_config == "Dung lượng pin":
                    pin = detail_config  
                # camera sau
                elif name_config == "Độ phân giải camera sau":
                    cameraSau = detail_config
                # camera truoc
                elif name_config == "Độ phân giải camera trước":
                    cameraTruoc = detail_config
        
            list_options_product = Selector(response).xpath('//div[@class="edit-price"]/div[@class="products_type"]/div[not(contains(@class, "poiter")) and @data="products_type_item"]')
     
            for product in list_options_product:
                item = CrawlDataPhoneItem()
                # name page
                item['namePage'] = "Di Động Thông Minh"
                #link image
                link_image  = product.xpath('span/img/@src').get()
                if link_image != '':
                    item['image'] = link_image
                else:
                    item['image'] = ''
                #color
                color = product.xpath('p/span/text()').getall()[0]
                if  color != '':
                    item['color'] = color
                else:
                    item['color'] = ''
                #price_sale  
                price_discount = product.xpath('p/span/text()').getall()[1]
                if  price_discount != '':
                    item['priceDiscount'] = price_discount.replace('.', '').replace('đ', '')
                else:
                    item['priceDiscount'] = ''
                    continue
                #link product
                item['linkProduct'] = link_product
                #name 
                if name != '':
                    item["name"] = name
                else:
                    item["name"] = ''
                #brand
                if  brand[1] != '':
                    if brand[1] == 'iPhone':
                        item['brand'] = 'Apple'
                    else:
                        item['brand'] = brand[1]
                else:
                    item['brand'] = ''
                # man hinh
                item['manHinh'] = manHinh                    
                # operating
                item["operating"] = operating                           
                # chipSet
                item["chipset"] = chipset          
                # ram
                item["ram"] = ram                
                # rom
                item["rom"] = rom                 
                # pin
                item["pin"] = pin   
                # cameraTruoc
                item["cameraTruoc"] = cameraTruoc   
                # cameraSau
                item["cameraSau"] = cameraSau 
                
                self.total += 1
                print(self.total)   
                yield item
        except:
            print("An exception occurred")



      