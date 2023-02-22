import re
from fuzzywuzzy import fuzz
from pymongo import MongoClient

def brand_matching (item_one, item_two):
    if "brand" in item_one.keys() and "brand" in item_two.keys():
        brand_one = item_one["brand"]
        brand_two = item_two["brand"]
        if brand_one == brand_two:
            return True
        list_same = ['xiaomi', 'poco', 'redmi']
        if brand_one in list_same and brand_two in list_same:
            return True
    return False

def clean_name(name):
    name = name.lower()
    name = name.replace("điện", "").replace("thoại", "")
    name = re.sub("\(.*\)", "", name)
    name = name.split("-")[0]
    name = name.split("–")[0]
    name = name.split("|")[0]
    name = re.sub("\d+[tmg]b(.*\d+[tmg]b)?", "", name)

    list_color = ['huyền', 'cam', 'đen', 'xanh', 'tím', 'xám', 'ánh', 'kim', 'đồng', 'thiên', 'thạch', 'dương', 'đậm', 'thanh', 'vàng', 'bạc', 'trắng', 'hồng', 'hà', 'lá', 'đỏ', 'kem', 'lục', 'nhạt', 'biển', 'cực', 'quang']
    list_brand = ['masstel','itel','nubia', 'tcl', 'vsmart', 'oneplus', 'asus', 'bphone', 'philips', 'samsung', 'galaxy', 'xiaomi', 'apple', 'iphone', 'oppo', 'realme', 'nokia', 'vivo', 'tecno']
    list_delete = ["dộng", "box", "chính", "hãng", "vna", "vn/a", "trưng", "bày", "cũ", "gia", "studio", "màu", "mới", "chính", "hãng", "ll", "za", "chính", "hãng"]

    for item_delete in list_delete:
        name = name.replace(item_delete, "")
        
    for brand in list_brand:
        name = name.replace(brand, "")
    for color in list_color:
        name = name.replace(color, "")
   
    name = name.split()
    name = ' '.join(name)
    return name

def name_matching (item_one, item_two, threshold):
    if "name" in item_one.keys() and "name" in item_two.keys():
        name_one = item_one["name"]
        name_two = item_two["name"]
        name_one_new = clean_name(name_one)
        name_two_new = clean_name(name_two)
        ratio = fuzz.token_set_ratio(name_one_new, name_two_new)
        if ratio > threshold:
            return True
    return False

def ram_matching (item_one, item_two, threshold_ram):
    if "ram" in item_one.keys() and "ram" in item_two.keys():
        ram_one = item_one["ram"]
        ram_two = item_two["ram"]
        ratio = fuzz.ratio(ram_one, ram_two)

        if ratio > threshold_ram:
            return True
        
    return False

def rom_matching (item_one, item_two, threshold_rom):
    if "rom" in item_one.keys() and "rom" in item_two.keys():
        rom_one = item_one["rom"]
        rom_two = item_two["rom"]
        ratio = fuzz.ratio(rom_one, rom_two)

        if ratio > threshold_rom:
            return True
        
    return False

def data_matching(item_one, item_two, threshold_name, threshold_ram, threshold_rom):
    brand_checked = brand_matching(item_one, item_two)
    if not brand_checked:
        return False
        
    name_checked = name_matching(item_one, item_two, threshold_name)
    if not name_checked:
        return False
    
    ram_checked = ram_matching(item_one, item_two, threshold_ram)
    if not ram_checked:
        return False

    rom_checked = rom_matching(item_one, item_two, threshold_rom)
    if not rom_checked:
        return False
    
    return True

def clean_brand(brand):
  brand = str(brand).strip().split()[0].lower()
  if brand == 'iphone':
    brand = 'apple'
  return brand

def clean_ram(ram):
  ram = str(ram).strip().upper()
  ram = ram + "GB"
  return ram

def clean_rom(rom):
  rom = str(rom).strip().upper()
  rom = rom + "GB"
  return rom

def clean_data(item):
  
  if 'brand' in item.keys():
    item['brand'] = clean_brand(item['brand'])
  
  if 'ram' in item.keys():
    item['ram'] = clean_ram(item['ram'])
  
  if 'rom' in item.keys():
    item['rom'] = clean_rom(item['rom'])

  if 'name' in item.keys():
    item['name'] = str(item['name']).strip()

def main():
    client = MongoClient("mongodb+srv://hoang:hoang@cluster0.vwzhu.mongodb.net/?retryWrites=true&w=majority")
    
    list_product = client.get_database('test').products
  
    data_crawl_clean = client.get_database('data_phone_db_clean').data_phone_items_clean

    list_product_shop_telephone = []
    for item in list(list_product.find()):
        list_product_shop_telephone.append(item)
    
    for item in list_product_shop_telephone:
        clean_data(item)

    list_database_clean = []
    for item in list(data_crawl_clean.find()):
        list_database_clean.append(item) 
    
    collection_name = 'data_matching'
    db = client.get_database('data_phone_db_clean')
    db[collection_name].delete_many({})

    for i in range(len(list_product_shop_telephone)):
      
        for item in list_database_clean:
            if data_matching(list_product_shop_telephone[i], item, threshold_name=90, threshold_ram=99, threshold_rom=99):
                
                idProductShop = str(list_product_shop_telephone[i]["_id"])
                name = item["name"]
                namePage = item["namePage"]
                rom = ''
                ram = ''
                color = ''
                linkProduct = ''
                price = ''
                priceDiscount = ''
                image = ''
                if "rom" in item.keys():
                    rom = item["rom"]
                if "ram" in item.keys():
                    ram = item["ram"]
                if "color" in item.keys():
                    color = item["color"]
                if "linkProduct" in item.keys():
                    linkProduct = item["linkProduct"]
                if "price" in item.keys():
                    price = item["price"]
                if "priceDiscount" in item.keys():
                    priceDiscount = item["priceDiscount"]
                if "image" in item.keys():
                    image = item["image"]

                data_object = {'idProductShop':idProductShop, 
                            'name':name, 
                            'namePage':namePage, 
                            'rom':rom, 
                            'ram':ram, 
                            'color':color, 
                            'linkProduct':linkProduct, 
                            'price':price, 
                            'priceDiscount':priceDiscount, 
                            'image':image}

                db[collection_name].insert_one(data_object)

if __name__ == "__main__":
    main()