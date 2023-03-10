import scrapy
import requests
from CrawlDataPhone.items import CrawlDataPhoneItem
from scrapy.selector import Selector

class HoangHaMobileSpider(scrapy.Spider):
    name = 'HoangHaMobile'
    link_products = []
    link_images = []
    list_name = []
    total = 0

    custom_settings = {
        'USER_AGENT' :  "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        # 'CONCURRENT_REQUESTS' : 1,
    }

    def start_requests(self):              

        link_page = "https://hoanghamobile.com/dien-thoai-di-dong?p={}"
        page = 1
        number_link = 0

        while True: 
            response = requests.get(link_page.format(page))
            if response.status_code != 200:
                break
            
            temp = Selector(response).xpath('//div[@class="list-product"]//div[@class="item"]/div[@class="info"]/a/@href').getall()
            if len(temp) > number_link:
                number_link = len(temp)
                page += 1
            else:
                for link in temp:
                    self.link_products.append("https://hoanghamobile.com" + link)

                self.link_images = Selector(response).xpath('//div[@class="list-product"]//div[@class="item"]/div[@class="img"]/a/img/@src').getall()
                self.list_name = Selector(response).xpath('//div[@class="list-product"]//div[@class="item"]/div[@class="info"]/a/@title').getall()
                break

        for i in range(len(self.link_products)):
                yield scrapy.Request(
                    url=self.link_products[i], 
                    callback=self.parse,
                    cb_kwargs=dict(link_product=self.link_products[i], link_image=self.link_images[i], name=self.list_name[i]),
                )
   
    def parse(self, response, link_product, link_image, name):
        try:
            
            name = name.replace('\t', '').replace('\n', '').replace('\r', '').replace('Điện ', '').replace('thoại ', '').replace('di ', '').replace('động ', '').strip()
            brand = Selector(response).xpath('//section/div[@class="container"]/ol[@class="breadcrumb"]/li/a/span/text()').getall()
            manHinh = operating = chipset = ram = rom = pin = None
            config = Selector(response).xpath('//div[@class="product-specs"]/div[@class="specs-special"]/ol')
            
            for ele in config:
                name_config = ele.xpath('li/strong/text()').get().replace(':', '')
                detail_config = ele.xpath('li/span/text()').get()
              
                if detail_config == '':
                    detail_config = ''
                # man hinh
                elif name_config == "Màn hình rộng":
                    manHinh = detail_config                    
                # operating
                elif name_config == "Hệ điều hành":
                    operating = detail_config                           
                # chipSet
                elif name_config == "Chip xử lý (CPU)":
                    chipset = detail_config                     
                # ram
                elif name_config == "RAM":
                    ram = detail_config               
                # rom
                elif name_config == "Bộ nhớ trong (ROM)":
                    rom = detail_config                
                # pin
                elif name_config == "Dung lượng pin":
                    pin = detail_config  
            
            list_options_product = Selector(response).xpath('//div[@class="product-option color"]/div[@class="options"]/div')
          
            for product in list_options_product:
                item = CrawlDataPhoneItem()

                # name page
                item['namePage'] = "HoangHaMobile"
                #link_image       
                if link_image != '':
                    item['image'] = link_image
                else:
                    item['image'] = ''
                #color
                color = product.xpath('@data-name').get()
                if  color != '':
                    item['color'] = color
                else:
                    item['color'] = ''
                #price_sale  
                price_discount = product.xpath('@data-bestprice').get()
                if  price_discount != '' and price_discount != 'Liên hệ':
                    item['priceDiscount'] = price_discount.replace(',', '').replace(' ', '').replace('₫', '')
                else:
                    item['priceDiscount'] = ''
                    continue
                #price goc    
                price = product.xpath('@data-lastprice').get().replace(',', '').replace(' ', '').replace('₫', '')
                if  price != '':
                    item['price'] = price
                else:
                    item['price'] = item['priceDiscount']
                #link product
                item['linkProduct'] = link_product
                #name 
                if name != '':
                    item["name"] = name.lower()
                else:
                    item["name"] = ''
                #brand
                if  brand[2] != '':

                    if len(brand[2].split()) == 1:
                        item['brand'] = brand[2].lower()
                    elif len(brand[2].split()) > 1 and name != '':
                        item['brand'] =  name.split()[0].lower()
                    else: 
                        item['brand'] = None
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
                
                self.total += 1
                print(self.total)   
                yield item
        except:
            print("An exception occurred")

