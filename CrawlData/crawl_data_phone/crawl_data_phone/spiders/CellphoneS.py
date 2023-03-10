import scrapy
import requests
import json
from crawl_data_phone.items import CrawlDataPhoneItem

class CellphoneSpider(scrapy.Spider):
    name = 'CellphoneS'
    products = []
    headers = {"content-type": "application/json"}
    
    custom_settings = {
        'USER_AGENT' :  "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        # 'DOWNLOAD_DELAY': 1, # 2 seconds of delay
        'RANDOMIZE_DOWNLOAD_DELAY': False,
        'CONCURRENT_REQUESTS' : 32,
        'FEED_EXPORT_ENCODING' : "utf-8",
    }

    def start_requests(self):              
        
        query = """
            query MyQuery($page: Int){
                products(
                        filter: {
                            static: {
                                categories: ["3"],
                                province_id: 30, 
                                stock: {
                                    from: 1
                                },
                                stock_available_id: [46, 56, 152],
                                filter_price: {from:1000to:55990000}
                            },
                            dynamic: {
                                
                            }
                        },
                        page: $page,
                        size: 20,
                        sort: [{view: desc}]
                ) {
                    general{
                        product_id
                        child_product
                        name
                    }
                }
        }
        """

        count = 0
        i = 1

        while True: 
            json_data = {
                'query': query,
                'variables': {
                    'page': i,
                },
                'operationName': 'MyQuery',
            }
            
            response = requests.post('https://api.cellphones.com.vn/v2/graphql/query', json=json_data)
           

            if response.status_code != 200:
                break
        
            if response.json()["data"] and response.json()["data"]["products"]:
                for item in response.json()["data"]["products"]:
                    self.products.append(item['general'])
                    count += 1
            else:
                break
            
            i += 1

        query_detail_product = """
            query QueryDetailProduct($id: ID!){
                product(
                    id: $id,
                    provinceId: 30,
                ){
                   
                    general {
                        name
                        url_path
                        attributes 
                    }

                    filterable {
                        price
                        special_price 
                        stock          
                    }

                    specification {
                        basic
                    }
                }
            }
        """

        for item in self.products:
            for id in item["child_product"]:

                payload = {
                  'query': query_detail_product,
                  'variables': {
                    'id': id,
                  },
                }

                yield scrapy.Request(
                    url='https://api.cellphones.com.vn/v2/graphql/query',
                    method='POST', 
                    body=json.dumps(payload), 
                    callback=self.parse, 
                    cb_kwargs=dict(name=item["name"], idProduct=id),
                    headers=self.headers
                )
   
    def parse(self, response, name, idProduct):
        try:
                  
            response_product  = response.json()
            if response.status == 200:
                
                product = response_product["data"]["product"]
                
                if (product["filterable"]["stock"] > 0 and product["general"]):

                    if (product["general"]["url_path"]  != ''):

                        item = CrawlDataPhoneItem()
                        item['namePage'] = "CellphoneS"

                        #link product
                        item['linkProduct'] = 'https://cellphones.com.vn/' + product["general"]["url_path"]
                       
                        #name 
                        item['name'] = name
                        
                        #brand 
                        if product["general"]["attributes"]["manufacturer"] != '':
                            if product["general"]["attributes"]["manufacturer"] == 'Hãng khác':
                                temp_name = name.split()[0]
                                item['brand'] = temp_name
                            else:
                                item['brand'] = product["general"]["attributes"]["manufacturer"]
                        else:
                            item['brand'] = None

                        #color
                        if product["general"]["attributes"]["color"] != '':
                            item['color'] = product["general"]["attributes"]["color"]
                        else:
                            item['color'] = None 

                        #link_image        
                        if product["general"]["attributes"]["image"] != '':
                            item['image'] = 'https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product' + product["general"]["attributes"]["image"]
                        else:
                            item['image'] = None  

                        #price goc    
                        if product["filterable"]["price"] != '':
                            item['price'] = product["filterable"]["price"]
                        else:
                            item['price'] = None
                        
                        #price_sale       
                        if product["filterable"]["special_price"] != 0:
                            item['priceDiscount'] = product["filterable"]["special_price"]
                        else:
                            item['priceDiscount'] = product["filterable"]["price"]

                        for temp in product["specification"]["basic"]:

                            if(temp["key"] == 'mobile_type_of_display'):
                                item['manHinh'] = temp["value"]
                            
                            if(temp["key"] == 'os_version'):
                                item['operating'] = temp["value"] 

                            if(temp["key"] == 'camera_secondary'):
                                item['cameraTruoc'] = temp['value']

                            if(temp["key"] == 'camera_primary'):
                                item['cameraSau'] = temp["value"]

                            if(temp["key"] == 'chipset'):
                                item['chipset'] = temp["value"]

                            if(temp["key"] == 'memory_internal'):
                                item['ram'] = temp["value"]

                            if(temp["key"] == 'storage'):
                                item['rom'] = temp["value"]

                            if(temp["key"] == 'battery'):
                                item['pin'] = temp["value"] 

                        yield item   

        except:
            print("An exception occurred")
                    

      