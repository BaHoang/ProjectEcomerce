import scrapy
import requests
from crawl_data_phone.items import CrawlDataPhoneItem
from scrapy.selector import Selector

class HNamMobileSpider(scrapy.Spider):
    name = 'HNamMobile'
    link_products = []
    link_images = []
    total = 0

    custom_settings = {
        # 'USER_AGENT' :  "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        'CONCURRENT_REQUESTS' : 1,
    }

    def start_requests(self):              

        link_page = "https://www.hnammobile.com/dien-thoai?filter=p-desc&page={}"
        page = 1

        while True: 
            print("========", page)
            response = requests.get(link_page.format(page))

            if response.status_code != 200:
                break
            
            for item in Selector(response).xpath('//div[@class="product "]/figure/a'):
                self.link_products.append(item.attrib['href'])
                self.link_images.append(item.xpath('div[@class="wrap-image-product"]/picture/img/@src').get())
            
            if len(Selector(response).xpath('//ul[@class="global_pagination"]/li[@class="next-item"]')) > 0:
                page += 1
            else:
                break

        for i in range(len(self.link_products)):
                yield scrapy.Request(
                    url=self.link_products[i], 
                    callback=self.parse,
                    cb_kwargs=dict(link_product=self.link_products[i], link_image=self.link_images[i]),
                )
   
    def parse(self, response, link_product, link_image):
        try:
            name = Selector(response).xpath('//h1[@class="f-20"]/text()').get()
            brand = Selector(response).xpath('//div[@class="container container-home clearfix"]/a/@title').getall()
            manHinh = operating = chipset = ram = rom = pin = cameraSau = cameraTruoc = None
            config = Selector(response).xpath('//table[@class="table table-specifications w-100"]')[0].xpath('tbody/tr')
          
            for ele in config:
                name_config = ele.xpath('td/text()').getall()[0]
                detail_config = ele.xpath('td/text()').getall()[1]
                         
                # man hinh
                if name_config == "Màn hình":
                    manHinh = detail_config            
                                 
                # operating
                elif name_config == "Hệ điều hành":
                    operating = detail_config  
                                             
                # chipSet
                elif name_config == "CPU":
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
                elif name_config == "Camera sau":
                    cameraSau = detail_config
              
                # camera truoc
                elif name_config == "Camera trước":
                    cameraTruoc = detail_config     
                
                else:
                    continue
                 
            print("==============")             
    
            list_options_product = Selector(response).xpath('//div[@class="list-radio"]/label[not(contains(@class, "out-of-stock"))]')
          
            for product in list_options_product:
                item = CrawlDataPhoneItem()
                            
                #color
                color = product.xpath('@data-colorname').get()
                item['color'] = color
              
                #price_sale  
                price_discount = product.xpath('@data-price').get()
                if  price_discount != '':
                    item['priceDiscount'] = price_discount
                else:
                    item['priceDiscount'] = ''
                    continue
                #price goc    
                # price = product.xpath('@data-lastprice').get().replace(',', '').replace(' ', '').replace('₫', '')
                # if  price != '':
                #     item['price'] = price
                # else:
                #     item['price'] = item['priceDiscount']

                #link_image       
                item['image'] = link_image
                #link product
                item['linkProduct'] = link_product
                #name 
                item["name"] = name
                #brand
                if  brand[2] != '': 
                    item['brand'] = brand[2]
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


