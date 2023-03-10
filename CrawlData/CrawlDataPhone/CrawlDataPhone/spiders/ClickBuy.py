import scrapy
import requests
from CrawlDataPhone.items import CrawlDataPhoneItem
from scrapy.selector import Selector

class ClickBuySpider(scrapy.Spider):
    name = 'ClickBuy'
    link_products = []
    total = 0

    custom_settings = {
        'USER_AGENT' :  "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        'CONCURRENT_REQUESTS' : 1,
    }

    def start_requests(self):              

        link_total = "https://clickbuy.com.vn/danh-muc/dien-thoai/page/{}/"
        page = 1
        count = 0

        while True: 
            print("========", page)
            response = requests.get(link_total.format(page))

            if response.status_code != 200:
                break
            
            for item in Selector(response).xpath('//main[@id="main"]/ul/li/a'):
                self.link_products.append(item.attrib['href'])
                count += 1
        
            page += 1

        for i in range(len(self.link_products)):
                yield scrapy.Request(
                    url=self.link_products[i], 
                    callback=self.parse,
                    cb_kwargs=dict(link_product=self.link_products[i]),
                )

    # def start_requests(self):              
    #     all_url = [
    #             # 'https://clickbuy.com.vn/apple-iphone-14-plus-128gb-chinh-hang-vna/',
    #             # 'https://clickbuy.com.vn/apple-iphone-14-128gb-chinh-hang-vna/',
    #             # 'https://clickbuy.com.vn/apple-iphone-14-pro-1tb-chinh-hang-vna/',
    #             # 'https://clickbuy.com.vn/apple-iphone-12-64gb-chinh-hang-vn-a/',
    #             # 'https://clickbuy.com.vn/samsung-galaxy-a14-5g-4gb-64gb-chinh-hang/',
    #             # 'https://clickbuy.com.vn/xiaomi-redmi-note-12-4gb-128gb-box/',
    #             # 'https://clickbuy.com.vn/samsung-galaxy-a73-8gb-128gb-chinh-hang-cu/',
    #             # 'https://clickbuy.com.vn/nokia-c01-plus-2gb-16gb-chinh-hang/',

    #             # 'https://clickbuy.com.vn/dien-thoai-nokia-5710/',
    #             # 'https://clickbuy.com.vn/xiaomi-poco-f3-8gb-256gb-chinh-hang/',
    #             # 'https://clickbuy.com.vn/oppo-reno-7-5g-8gb-256gb-chinh-hang/',
    #             # 'https://clickbuy.com.vn/bphone-a50-chinh-hang/',
    #             'https://clickbuy.com.vn/bphone-a60-chinh-hang/',
    #         ]
    #     for i in range(len(all_url)):
    #             yield scrapy.Request(
    #                 url=all_url[i], 
    #                 callback=self.parse,
    #                 cb_kwargs=dict(link_product=all_url[i]),
    #             )
   
    def parse(self, response, link_product):
        try:
           
            list_color = Selector(response).xpath('//div[@class="tawcvs-swatches"]/span/strong/text()').getall()
            list_image = Selector(response).xpath('//div[@class="tawcvs-swatches"]/span/img/@src').getall()
            list_priceDiscount = Selector(response).xpath('//div[@class="tawcvs-swatches"]/span/@data-price').getall()
            list_price = Selector(response).xpath('//div[@class="tawcvs-swatches"]/span/del/span/bdi/text()').getall()
            
            if (len(list_price) == 0):
                list_price = list_priceDiscount
            
            for i in range(len(list_priceDiscount)):
                item = CrawlDataPhoneItem()
                # name page
                item['namePage'] = "ClickBuy"

                #link_image       
                if list_image[i] != None:
                    item['image'] = "https:"+list_image[i]
                else:
                    item['image'] = None  

                #color
                if  list_color[i] != None:
                    item['color'] = list_color[i]
                else:
                    item['color'] = None 
            
                #price_sale  
                if  list_priceDiscount[i] != None:
                    item['priceDiscount'] = list_priceDiscount[i].replace(',', '').replace('\xa0', '')
                else:
                    item['priceDiscount'] = None

                #price goc    
                if  list_price[i] != None:
                    item['price'] = list_price[i].replace(',', '').replace('\xa0', '')
                else:
                    item['price'] = None

                #link product
                item['linkProduct'] = link_product
            
                #name 
                name = Selector(response).xpath('//h1[@class="product_title entry-title"]/text()').get()
                if name != None:
                    item["name"] = name
                else:
                    item["name"] = None    

                brand = Selector(response).xpath('//nav[@class="woocommerce-breadcrumb"]/a/text()').getall()
                if  brand[2] != None:
                    if (brand[2] == "iPhone"):
                        item['brand'] = 'Apple'
                    else:
                        item['brand'] = brand[2]
                else:
                    item['brand'] = None
                
                config = Selector(response).xpath('//table[@class="woocommerce-product-attributes shop_attributes"]/tr/th/text()').getall()
                detail = Selector(response).xpath('//table[@class="woocommerce-product-attributes shop_attributes"]/tr/td[@class="woocommerce-product-attributes-item__value"]/p')

                for i in range(len(config)):
                    ele = config[i]
                    
                    # man hinh
                    if ele == "Kích thước màn hình":
                        manHinh = detail[i].xpath('text()').get()
                       
                        if  manHinh != None:
                            item['manHinh'] = manHinh
                        else:
                            item['manHinh'] = None 
                        
                    # operating
                    if ele == "Hệ điều hành":
                        operating = detail[i].xpath('text()').get()
                        if operating != None:
                            item["operating"] = operating
                        else: 
                            item['operating'] = None
                        
                    #cameraTruoc
                    if ele == "Camera phụ":
                        cameraTruoc = detail[i].xpath('text()').get()
                        if cameraTruoc != None:
                            item["cameraTruoc"] = cameraTruoc
                        else: 
                            item['cameraTruoc'] = None
                        
                    # cameraSau
                    if ele == "Camera chính":
                        cameraSau = detail[i].xpath('text()').get()
                        if cameraSau != None:
                            item["cameraSau"] = cameraSau
                        else: 
                            item['cameraSau'] = None
                            
                    # chipSet
                    if ele == "CPU":
                        chipset = detail[i].xpath('text()').get()
                        if chipset != None:
                            item["chipset"] = chipset
                        else: 
                            item['chipset'] = None
                        
                    # ram
                    if ele == "RAM":
                        ram  = detail[i].xpath('text()').get()
                        if ram != None:
                            item["ram"] = ram
                        else: 
                            item['ram'] = None
                    
                    # rom
                    if ele == "Bộ nhớ trong":
                        rom = detail[i].xpath('a/text()').get()
                        if rom != None:
                            item["rom"] = rom
                        else: 
                            item['rom'] = None
                        
                    # pin
                    if ele == "Dung lượng pin":
                        pin = detail[i].xpath('text()').get()
                        if pin != None:
                            item["pin"] = pin
                        else: 
                            item['pin'] = None

                self.total += 1
                print(self.total)   
                yield item

        except:
            print("An exception occurred")


# import scrapy
# import requests
# from crawl_data_phone.items import CrawlDataPhoneItem
# from scrapy.selector import Selector

# class ClickBuySpider(scrapy.Spider):
#     name = 'ClickBuy'
#     total = 0

#     custom_settings = {
#         # 'USER_AGENT' :  "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
#         # 'DOWNLOAD_DELAY': 4, # 2 seconds of delay
#         # 'RANDOMIZE_DOWNLOAD_DELAY': False,
#         'CONCURRENT_REQUESTS' : 1,
#         # 'FEED_EXPORT_ENCODING' : "utf-8",
#     }

#     def start_requests(self):          

#         link_product = 'https://clickbuy.com.vn/apple-iphone-14-plus-128gb-chinh-hang-vna/'
        
#         yield scrapy.Request(
#             url=link_product, 
#             callback=self.parse,
#             cb_kwargs=dict(link_product=link_product),
#         )
   
#     def parse(self, response, link_product):
#         try:
          
#             list_color = Selector(response).xpath('//div[@class="tawcvs-swatches"]/span/strong/text()').getall()
#             list_image = Selector(response).xpath('//div[@class="tawcvs-swatches"]/span/img/@src').getall()
#             list_priceDiscount =  Selector(response).xpath('//div[@class="tawcvs-swatches"]/span/@data-price').getall()
#             list_price = Selector(response).xpath('//div[@class="tawcvs-swatches"]/span/del/span/bdi/text()').getall()
#             print("====================",)
#             # print(list_price, list_color, list_priceDiscount)
            
#             for i in range(len(list_priceDiscount)):
#                 item = CrawlDataPhoneItem()
              
#                 #link_image       
#                 if list_image[i] != None:
#                     item['image'] = "https:"+list_image[i]
#                 else:
#                     item['image'] = None  
              
#                 #color
#                 if  list_color[i] != None:
#                     item['color'] = list_color[i]
#                 else:
#                     item['color'] = None 
             
#                 #price_sale  
#                 if  list_priceDiscount[i] != None:
#                     item['priceDiscount'] = list_priceDiscount[i].replace(',', '').replace('\xa0', '')
#                 else:
#                     item['priceDiscount'] = None
               
#                 #link product
#                 item['linkProduct'] = link_product
                
#                 #name 
#                 name = Selector(response).xpath('//h1[@class="product_title entry-title"]/text()').get()
#                 if name != None:
#                     item["name"] = name
#                 else:
#                     item["name"] = None  
                
#                 #price goc  
#                 if (len(list_price) == 0):  
#                     price = Selector(response).xpath('//p[@class="price wcmlim_product_price beforeLoadRice"]//span/bdi/text()').get().replace(',', '').replace('\xa0', '') 
#                     if  price!= None:
#                         item['price'] = price
#                     else:
#                         item['price'] = None
#                 else:
#                     if  list_price[i] != None:
#                         item['price'] = list_price[i].replace(',', '').replace('\xa0', '')
#                     else:
#                         item['price'] = None
                
#                 config = Selector(response).xpath('//table[@class="woocommerce-product-attributes shop_attributes"]/tr/th/text()').getall()
#                 detail = Selector(response).xpath('//table[@class="woocommerce-product-attributes shop_attributes"]/tr/td[@class="woocommerce-product-attributes-item__value"]/p')

#                 for i in range(len(config)):
#                     ele = config[i]
                    
#                     #brand
#                     if ele.lower() == "thương hiệu" or ele.lower() == "hãng sản xuất":
                    
#                         brand = detail[i].xpath('text()').get()
#                         if  brand != None:
#                             item['brand'] = brand
#                         else:
#                             item['brand'] = None
                    
#                     # man hinh
#                     if ele == "Kích thước màn hình":
#                         manHinh = detail[i].xpath('//p/text()').get()
#                         if  manHinh != None:
#                             item['manHinh'] = manHinh
#                         else:
#                             item['manHinh'] = None 
                        
#                     # operating
#                     if ele == "Hệ điều hành":
#                         operating = detail[i].xpath('text()').get()
#                         if operating != None:
#                             item["operating"] = operating
#                         else: 
#                             item['operating'] = None
                        
#                     #cameraTruoc
#                     if ele == "Camera phụ":
#                         cameraTruoc = detail[i].xpath('text()').get()
#                         if cameraTruoc != None:
#                             item["cameraTruoc"] = cameraTruoc
#                         else: 
#                             item['cameraTruoc'] = None
                        
#                     # cameraSau
#                     if ele == "Camera chính":
#                         cameraSau = detail[i].xpath('text()').get()
#                         if cameraSau != None:
#                             item["cameraSau"] = cameraSau
#                         else: 
#                             item['cameraSau'] = None
                            
#                     # chipSet
#                     if ele == "CPU":
#                         chipset = detail[i].xpath('text()').get()
#                         if chipset != None:
#                             item["chipset"] = chipset
#                         else: 
#                             item['chipset'] = None
                        
#                     # ram
#                     if ele == "RAM":
#                         ram  = detail[i].xpath('text()').get()
#                         if ram != None:
#                             item["ram"] = ram
#                         else: 
#                             item['ram'] = None
                    
#                     # rom
#                     if ele == "Bộ nhớ trong":
#                         rom = detail[i].xpath('a/text()').get()
#                         if rom != None:
#                             item["rom"] = rom
#                         else: 
#                             item['rom'] = None
                        
#                     # pin
#                     if ele == "Dung lượng pin":
#                         pin = detail[i].xpath('text()').get()
#                         if pin != None:
#                             item["pin"] = pin
#                         else: 
#                             item['pin'] = None

#                 self.total += 1
#                 print(self.total)   
#                 yield item

#         except:
#             print("An exception occurred")




      