import scrapy
import requests
from CrawlDataPhone.items import CrawlDataPhoneItem
from scrapy.selector import Selector

class NguyenKimSpider(scrapy.Spider):
    name = 'NguyenKim'
    link_products = []
    link_images = []
  
    
    custom_settings = {
        # 'USER_AGENT' :  "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        # 'DOWNLOAD_DELAY': 1, # 2 seconds of delay
        # 'RANDOMIZE_DOWNLOAD_DELAY': False,
        # 'CONCURRENT_REQUESTS' : 32,
        # 'FEED_EXPORT_ENCODING' : "utf-8",
    }

    def start_requests(self):              

        link_total = "https://www.nguyenkim.com/dien-thoai-di-dong/page-{}/"
        page = 1
        count = 0

        while True: 
            response = requests.get(link_total.format(page))

            if response.status_code != 200:
                break
            
            print("=============", page)
            for item in Selector(response).xpath('//div[@id="pagination_contents"]/a[@class="product-render"]'):
                self.link_products.append(item.attrib['href'])
                self.link_images.append(item.xpath('//div[@class="product-image"]/a/img/@src').get())
                count += 1
        
            page += 1
        
        print("=========", count)

        for i in range(len(self.link_products)):
                yield scrapy.Request(
                    url=self.link_products[i], 
                    callback=self.parse,
                    cb_kwargs=dict(link_product=self.link_products[i], link_image=self.link_images[i]),
                )
   
    def parse(self, response, link_product, link_image):
        try:
            
            item = CrawlDataPhoneItem()
            
            if response.status == 200:
                
                #link product
                item['linkProduct'] = link_product
               
                #name 
                name = response.xpath('//div[@class="wrap_name_vote"]/h1[@class="product_info_name"]/text()').get()
                if name != None:
                    item["name"] = name
                else:
                    item["name"] = None

                # name page
                item['namePage'] = "Nguyễn Kim"

                #link_image       
                if link_image != None:
                    item['image'] = link_image
                else:
                    item['image'] = None        
                
                #price goc    
                price = response.xpath('//div[@class="product_info_price_value-real"]/span/text()').get()  
                if  price!= None:
                    item['price'] = price
                else:
                    item['price'] = None
                
                #price_sale  
                priceDiscount = response.xpath('//div[@class="product_info_price_value-final"]/span/text()').get()   
                if  priceDiscount != None:
                    item['priceDiscount'] = priceDiscount
                else:
                    item['priceDiscount'] = None

                for ele in response.xpath('//tbody[@id="custom-scroll-popup-tskt"]/tr'):
                    title = ele.xpath('td[@class="title"]/text()').get()
                    #brand
                    if title.replace(":", "") == "Nhà sản xuất":
                        brand = ele.xpath('td[@class="value"]/text()').get()
                        if  brand != None:
                            item['brand'] = brand
                        else:
                            item['brand'] = None
                    #color
                    if title.replace(":", "") == "Màu sắc":
                        color = ele.xpath('td[@class="value"]/text()').get()
                        #color
                        if  color != None:
                            item['color'] = color
                        else:
                            item['color'] = None 

                    # man hinh
                    if title.replace(":", "") == "Loại màn hình":
                        manHinh = ele.xpath('td[@class="value"]/text()').get()
                        if  manHinh != None:
                            item['manHinh'] = manHinh
                        else:
                            item['manHinh'] = None 

                    # operating
                    if title.replace(":", "") == "Hệ điều hành":
                        operating = ele.xpath('td[@class="value"]/text()').get()
                        if operating != None:
                            item["operating"] = operating
                        else: 
                            item['operating'] = None

                    # cameraTruoc
                    if title.replace(":", "") == "Camera trước":
                        cameraTruoc = ele.xpath('td[@class="value"]/text()').get()
                        if cameraTruoc != None:
                            item["cameraTruoc"] = cameraTruoc
                        else: 
                            item['cameraTruoc'] = None
                        
                    # cameraSau
                    if title.replace(":", "") == "Camera sau":
                        cameraSau = ele.xpath('td[@class="value"]/text()').get()
                        if cameraSau != None:
                            item["cameraSau"] = cameraSau
                        else: 
                            item['cameraSau'] = None
                        
                    # chipset
                    if title.replace(":", "") == "Chipset":
                        chipset = ele.xpath('td[@class="value"]/text()').get()
                        if chipset != None:
                            item["chipset"] = chipset
                        else: 
                            item['chipset'] = None
                        
                    # ram
                    if title.replace(":", "") == "RAM":
                        ram = ele.xpath('td[@class="value"]/text()').get()
                        if ram != None:
                            item["ram"] = ram
                        else: 
                            item['ram'] = None
                        
                    # rom
                    if title.replace(":", "") == "Bộ nhớ trong":
                        rom = ele.xpath('td[@class="value"]/text()').get()
                        if rom != None:
                            item["rom"] = rom
                        else: 
                            item['rom'] = None
                        
                    # pin
                    if title.replace(":", "") == "Dung lượng Pin":
                        pin = ele.xpath('td[@class="value"]/text()').get()
                        if pin != None:
                            item["pin"] = pin
                        else: 
                            item['pin'] = None

                yield item   

        except:
            print("An exception occurred")
                    

      