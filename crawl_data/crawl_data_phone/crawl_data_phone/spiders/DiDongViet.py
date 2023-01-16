import scrapy
import requests
from crawl_data_phone.items import CrawlDataPhoneItem
from scrapy.selector import Selector
import json
from lxml import html

class DiDongVietSpider(scrapy.Spider):
    name = 'DiDongViet'
    link_products_image = []
    total_item = 0

    custom_settings = {
        'USER_AGENT' :  "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        # 'CONCURRENT_REQUESTS' : 1,
        # 'DOWNLOAD_DELAY': 1, # 2 seconds of delay
    }

    def start_requests(self):    
        link_begin = "https://didongviet.vn/dien-thoai.html"
        response = requests.get(link_begin)
        if response.status_code == 200:
            response_begin = html.fromstring(response.text)       
            total = 0
            limit = 0
            ajax = 1
            for ele in response_begin.xpath('//div[@class="viewmorepager"]/form/input'):
                if ele.xpath('@name')[0] == 'total':
                    total = int(ele.xpath('@value')[0])
                if ele.xpath('@name')[0] == 'limit':
                    limit = int(ele.xpath('@value')[0])
                if ele.xpath('@name')[0] == 'ajax':
                    ajax = ele.xpath('@value')[0]    

            page = 1
            count = 0

            while (total - limit * (page - 1)) > 0:
                
                link_page = f"https://didongviet.vn/dien-thoai.html?total={total}&ajax={ajax}&limit={limit}&p={page}"
            
                response = requests.get(link_page)

                if response.status_code != 200:
                    break

                products = html.fromstring(json.loads(response.text)['products_list'])  
                #print(products.xpath('//ol[@class="products list items product-items"]/li[@class="item product product-item"]//div[@class="product-item-image"]/a[@class="product-item-link"]'))             
                
                for item in products.xpath('//ol[@class="products list items product-items"]/li[@class="item product product-item"]//div[@class="product-item-image"]/a[@class="product-item-link"]'):
                    temp_link = item.attrib['href']
                    temp_image = item.xpath('div/img/@src')[0]
                    self.link_products_image.append({"link": temp_link, "image": temp_image})
                    count += 1
                
                page += 1

            for i in range(len(self.link_products_image)):
                yield scrapy.Request(
                    url=self.link_products_image[i]["link"], 
                    callback=self.parse,
                    cb_kwargs=dict(link_product=self.link_products_image[i]["link"], link_image=self.link_products_image[i]["image"]),
                )

    def parse(self, response, link_product, link_image):
        try:
           
            list_color = Selector(response).xpath('//div[@class="  control-option"]/label/@data-title').getall()
            # list_image = Selector(response).xpath('//div[@class="tawcvs-swatches"]/span/img/@src').getall()
            list_priceDiscount = Selector(response).xpath('//div[@class="  control-option"]/label/@data-price').getall()
            list_price = Selector(response).xpath('//div[@class="  control-option"]/label/@data-marketprice').getall()
            
            for i in range(len(list_priceDiscount)):
                item = CrawlDataPhoneItem()
                # name page
                item['namePage'] = "Di Động Việt"
                #link_image       
                if link_image != None:
                    item['image'] = link_image
                else:
                    item['image'] = None  

                #color
                if  list_color[i] != None:
                    item['color'] = list_color[i].replace('Màu ', '')
                else:
                    item['color'] = None 
            
                #price_sale  
                if  list_priceDiscount[i] != None:
                    item['priceDiscount'] = list_priceDiscount[i].replace('.','').replace('\xa0₫', '')
                else:
                    item['priceDiscount'] = None

                #price goc    
                if  list_price[i] != None:
                    item['price'] = list_price[i].replace('.','').replace('\xa0₫', '')
                else:
                    item['price'] = None

                #link product
                item['linkProduct'] = link_product
            
                #name 
                name = Selector(response).xpath('//div[@class="heading-title"]/h1/text()').get()
                if name != None:
                    item["name"] = name
                else:
                    item["name"] = None    

                brand = Selector(response).xpath('//ul[@class="items"]/li/a/text()').getall()
                if  brand[2] != None:
                    if (brand[2] == "iPhone"):
                        item['brand'] = 'Apple'
                    else:
                        item['brand'] = brand[2]
                else:
                    item['brand'] = None
            
                for ele in Selector(response).xpath('//ul[@class="display"]/li'):
               
                    name_config = ele.xpath('p/text()').get()
                    
                    # man hinh
                    if name_config == "Màn hình rộng":
                        manHinh = ele.xpath('div/span//text()').get()
                       
                        if  manHinh != None:
                            item['manHinh'] = manHinh
                        else:
                            item['manHinh'] = None 
                        
                    # operating
                    if name_config == "Hệ điều hành":
                        operating = ele.xpath('div/span//text()').get()
                        if operating != None:
                            item["operating"] = operating
                        else: 
                            item['operating'] = None
                        
                    #cameraTruoc
                    if name_config == "Camera trước":
                        cameraTruoc = ele.xpath('div/span//text()').get()
                        if cameraTruoc != None:
                            item["cameraTruoc"] = cameraTruoc
                        else: 
                            item['cameraTruoc'] = None
                        
                    # cameraSau
                    if name_config == "Camera sau":
                        cameraSau = ele.xpath('div/span//text()').get()
                        if cameraSau != None:
                            item["cameraSau"] = cameraSau
                        else: 
                            item['cameraSau'] = None
                            
                    # chipSet
                    if name_config == "Chipset (hãng SX CPU)":
                        chipset = ele.xpath('div/span//text()').get()
                        if chipset != None:
                            item["chipset"] = chipset
                        else: 
                            item['chipset'] = None
                        
                    # ram
                    if name_config == "RAM":
                        ram  = ele.xpath('div/span//text()').get()
                        if ram != None:
                            item["ram"] = ram
                        else: 
                            item['ram'] = None
                    
                    # rom
                    if name_config == "Bộ nhớ trong":
                        rom = ele.xpath('div/span//text()').get()
                        if rom != None:
                            item["rom"] = rom
                        else: 
                            item['rom'] = None
                        
                    # pin
                    if name_config == "Dung lượng pin":
                        pin = ele.xpath('div/span//text()').get()
                        if pin != None and pin != "Đang cập nhật":
                            item["pin"] = pin
                        else: 
                            item['pin'] = None

                self.total_item += 1
                print(self.total_item)   
                yield item

        except:
            print("An exception occurred")