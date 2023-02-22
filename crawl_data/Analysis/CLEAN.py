
import re
from pymongo import MongoClient

def clean_brand(brand):
  brand = str(brand).strip().split()[0].lower()
  if brand == 'iphone':
    brand = 'apple'
  return brand

def clean_price_discount(priceDiscount, check):
  if check:
    list_word = ["Liên", "hệ"]
    priceDiscount = str(priceDiscount).strip().replace('.', '').replace('đ', '')
    for word in list_word:
      if word in priceDiscount:
          priceDiscount = 0
          break
    return str(priceDiscount)
  else:
    priceDiscount = str(priceDiscount).strip().replace('đ', '').split('.')[0]
    return str(priceDiscount)

def clean_price(price, check):
  if check:
    price = str(price).strip().replace('.', '').replace('đ', '')
  else:
    price = str(price).strip().replace('đ', '').split('.')[0]
  return str(price)

def clean_ram(ram):
  ram = str(ram).strip().upper()
  if 'GB' in ram or 'G' in ram:
    ram = ram.split()[0].replace('G', '').replace('B', '').replace('+','')
    ram = re.sub("\(.*\)", "", ram)
    ram = re.sub("\,", "", ram)
    if ram != '' and ram.isnumeric():
      ram = ram + "GB"
      return ram
  
  if 'MB' in ram or 'M' in ram:
    ram = ram.split()[0].replace('M', '').replace('B', '').replace('+','')
    ram = re.sub("\(.*\)", "", ram)
    ram = re.sub("\,", "", ram)
    if ram != '' and ram.isnumeric():
      ram = ram + "MB"
      return ram

  return ""

def preprocessing_ram(item):
  if ("ram" not in item) or ("ram" in item and item["ram"] == None) :
    name = item["name"].lower()
    check_have_ram_rom = re.search("[0-9]+[mg]b[- / | \s]+[0-9]+[tmg][b]?", name)
    if check_have_ram_rom:
        ram_rom = re.findall("[0-9]+[mg]b[- / | \s]+[0-9]+[tmg][b]?", name)[0]

        if '-' in ram_rom:
            ram = re.split('[-]', ram_rom)[0]
            item["ram"] = clean_ram(ram)
        elif '|' in ram_rom:
            ram = re.split('[|]', ram_rom)[0]
            item["ram"] = clean_ram(ram)
        elif '/' in ram_rom:
            ram = re.split('[/]', ram_rom)[0]
            item["ram"] = clean_ram(ram)
        else:
            ram = re.split('[\s]', ram_rom)[0]    
            item["ram"] = clean_ram(ram) 
  
  if "ram" in item:
    item['ram'] = clean_ram(item['ram'])

def clean_rom(rom):
  rom = str(rom).strip().upper()
  if 'GB' in rom or 'G' in rom:
    rom = rom.split()[0].replace('G', '').replace('B', '')
    rom = re.sub("\(.*\)", "", rom)
    rom = re.sub("\,", "", rom)
    if rom != '' and rom.isnumeric():
      rom = rom + "GB"
      return rom
  
  if 'MB' in rom or 'M' in rom:
    rom = rom.split()[0].replace('M', '').replace('B', '')
    rom = re.sub("\(.*\)", "", rom)
    rom = re.sub("\,", "", rom)
    if rom != '' and rom.isnumeric():
      rom = rom + "MB"
      return rom
  
  if 'TB' in rom or 'T' in rom:
    rom = rom.split()[0].replace('T', '').replace('B', '')
    rom = re.sub("\(.*\)", "", rom)
    rom = re.sub("\,", "", rom)
    if rom != '' and rom.isnumeric():
      rom = rom + "TB"
      return rom

  return ""

def preprocessing_rom(item):
  if ("rom" not in item) or ("rom" in item and item["rom"] == None):
    name = item["name"].lower()
    check_have_ram_rom = re.search("[0-9]+[mg]b[- / | \s]+[0-9]+[tmg][b]?", name)
    if check_have_ram_rom:
        ram_rom = re.findall("[0-9]+[mg]b[- / | \s]+[0-9]+[tmg][b]?", name)[0]
        if '-' in ram_rom:
            rom = re.split('[-]', ram_rom)[-1]
            item["rom"] = rom
        elif '|' in ram_rom:
            rom = re.split('[|]', ram_rom)[-1]
            item["rom"] = rom
        elif '/' in ram_rom:
            rom = re.split('[/]', ram_rom)[-1]
            item["rom"] = rom
        else:
            rom = re.split('[\s]', ram_rom)[-1]    
            item["rom"] = rom   
    else:
        check_have_rom = re.search("[0-9]+[tmg][b]", name)
        if check_have_rom:
            rom = re.findall("[0-9]+[tmg][b]", name)[0]
            item["rom"] = rom
  
  if "rom" in item:
    item['rom'] = clean_rom(item['rom'])

def clean_data(item):
  
  if 'brand' in item.keys():
    item['brand'] = clean_brand(item['brand'])

  preprocessing_ram(item)
  preprocessing_rom(item)
    
  if 'price' in item.keys():
    if item['namePage'] == 'CellphoneS':
        item['price'] = clean_price(item['price'], False)
    else:
        item['price'] = clean_price(item['price'], True)

  if 'priceDiscount' in item.keys():
    if item['namePage'] == 'CellphoneS':
        item['priceDiscount'] = clean_price_discount(item['priceDiscount'], False)
    else:
        item['priceDiscount'] = clean_price_discount(item['priceDiscount'], True)

  if 'cameraSau' in item.keys():
    item['cameraSau'] = str(item['cameraSau']).strip()
  
  if 'cameraTruoc' in item.keys():
    item['cameraTruoc'] = str(item['cameraTruoc']).strip()
  
  if 'chipset' in item.keys():
    item['chipset'] = str(item['chipset']).strip()

  if 'color' in item.keys():
    item['color'] = str(item['color']).strip()
  
  if 'image' in item.keys():
    item['image'] = str(item['image']).strip()
  
  if 'linkProduct' in item.keys():
    item['linkProduct'] = str(item['linkProduct']).strip()
  
  if 'manHinh' in item.keys():
    item['manHinh'] = str(item['manHinh']).strip()

  if 'name' in item.keys():
    item['name'] = str(item['name']).strip()
  
  if 'operating' in item.keys():
    item['operating'] = str(item['operating']).strip()
  
  if 'pin' in item.keys():
    item['pin'] = str(item['pin']).strip()

def check_item(item):
  check = True

  if 'name' not in item.keys() or ('name' in item.keys() and item['name'] == ''):
    check = False

  if 'linkProduct' not in item.keys() or ('linkProduct' in item.keys() and item['linkProduct'] == ''):
    check = False
  
  if 'brand' not in item.keys() or ('brand' in item.keys() and item['brand'] == ''):
    check = False
  
  if 'rom' not in item.keys() or ('rom' in item.keys() and item['rom'] == ''):
    check = False
  
  if 'ram' not in item.keys() or ('ram' in item.keys() and item['ram'] == ''):
    check = False

  if 'priceDiscount' not in item.keys() or ('priceDiscount' in item.keys() and item['priceDiscount'] == '0'):
    check = False 

  return check

def main():

    client = MongoClient("mongodb+srv://hoang:hoang@cluster0.vwzhu.mongodb.net/?retryWrites=true&w=majority")
    db = client.get_database('data_phone_db')
    phones = db.data_phone_items
    list_database = []
    for item in list(phones.find()):
        list_database.append(item)

    for item in list_database:
        clean_data(item)

    uri_name = 'mongodb+srv://hoang:hoang@cluster0.vwzhu.mongodb.net/?retryWrites=true&w=majority'
    db_name = 'data_phone_db_clean'
    collection_name = 'data_phone_items_clean'

    client = MongoClient(uri_name)
    db = client[db_name]
    db[collection_name].delete_many({})

    for item in list_database:
        if check_item(item):
            db[collection_name].insert_one(dict(item))
    
if __name__ == "__main__":
    main()