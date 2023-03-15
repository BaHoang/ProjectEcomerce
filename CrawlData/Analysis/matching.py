import re
from fuzzywuzzy import fuzz
from pymongo import MongoClient

color_cluster = [['đen ghi',
  'phantom black',
  'đen',
  'đen huyền bí',
  'đen tinh vân',
  'đen fs',
  'đen (trôi bh)',
  'đen phá cách',
  'màu đen fs',
  'màu đen',
  'space black',
  'midnight',
  'black',
  'matte black',
  'đen bí ẩn',
  'đen tuyền',
  'đen thiên thạch',
  'đen mạnh mẽ',
  'graphite',
  'đen caro',
  'đen graphite',
  'black - red',
  'đen từ tính',
  'cosmic black',
  'obsidian',
  'đen kim sa',
  'tech black',
  'đen tuyền',
  'đen tinh quang',
  'graphite black',
  'aura black',
  'đen nhám'],
 ['trắng ngọc',
  'trắng',
  'phantom white',
  'white',
  'starlight',
  'trắng cực quang',
  'trắng ngọc trai',
  'trắng kim cương',
  'trắng flora',
  'aura white'],
 ['tím',
  'deep purple',
  'purple',
  'tím hồng',
  'tím pastel',
  'tím cực quang',
  'violet',
  'lavender'],
 ['xám', 'gray', 'xám ánh kim', 'xám kim loại', 'space grey', 'grey'],
 ['cam đào', 'cam', 'orange'],
 ['bạc', 'silver', 'artic silver'],
 ['vàng',
  'gold',
  'pink gold',
  'yellow',
  'vàng (gold)',
  'vàng đồng',
  'vàng phù sa',
  'vàng hồng',
  'prime gold',
  'supernova',
  'rose gold'],
 ['burgundy', 'đỏ', 'red', 'aura red'],
 ['đồng ánh hồng', 'đồng', 'cooper'],
 ['pink', 'hồng'],
 ['kem', 'moon beige', 'beige', 'cream'],
 ['green',
  'gray green',
  'alpine green',
  'light green',
  'midnight green',
  'mystic green',
  'xanh lá',
  'xanh mint',
  'xanh lục',
  'xanh thiên thạch',
  'xanh vàng',
  'xanh niken',
  'xanh olive',
  'băng cẩm thạch',
  'xanh trắng'],
 ['xanh tím',
  'lam',
  'blue',
  'dương',
  'xanh đen',
  'xanh biển',
  'xanh thiên thanh',
  'xanh nhạt',
  'navy',
  'xanh tinh vân',
  'xanh ánh kim',
  'xanh thiên hà',
  'xanh bắc âu'],
 ['xanh đen'],
 ['xanh hồng'],
 ['xanh caro']]

def get_index_in_cluster(color):
    for i in range(len(color_cluster)):
        if color.lower().strip() in color_cluster[i]:
            return i
    return -1

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
        ratio = fuzz.partial_ratio(name_one_new, name_two_new)
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

def color_matching (item_one, item_two):
    if "color" in item_one.keys() and "color" in item_two.keys():
        color_one = item_one["color"]
        color_two = item_two["color"]
        
        index_color_one = get_index_in_cluster(color_one)
        index_color_two = get_index_in_cluster(color_two)

        if index_color_one > -1 and index_color_one == index_color_two :
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
    
    color_checked = color_matching(item_one, item_two)
    if not color_checked:
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
    item['name'] = clean_name(str(item['name']).strip())

def main():
    # f = open("/home/hoang/Documents/ProjectEcomerce/crawl_data/Analysis/demo2.txt", "w")
    # f.write("Woops! I have deleted the content!")
    # f.close()

    client = MongoClient("mongodb+srv://hoang:hoang@cluster0.vwzhu.mongodb.net/?retryWrites=true&w=majority")
    
    list_product = client.get_database('test').products
    data_crawl_clean = client.get_database('data_phone_db_clean').data_phone_items_clean_two

    list_product_shop_telephone = []
    for item in list(list_product.find()):
        list_product_shop_telephone.append(item)
    
    for item in list_product_shop_telephone:
        clean_data(item)

    list_database_clean = []
    for item in list(data_crawl_clean.find()):
        list_database_clean.append(item) 
    
    collection_name = 'data_matching_two'
    db = client.get_database('data_phone_db_clean')
    db[collection_name].delete_many({})

    for i in range(len(list_product_shop_telephone)):
      
        for item in list_database_clean:
            if data_matching(list_product_shop_telephone[i], item, threshold_name=95, threshold_ram=90, threshold_rom=90):
                
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