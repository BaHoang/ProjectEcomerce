from pymongo import MongoClient

def main():
      
    mongodb_uri = 'mongodb+srv://hoang:hoang@cluster0.vwzhu.mongodb.net/?retryWrites=true&w=majority'
    mongodb_db = 'data_phone_db'
    collection = 'data_phone_items_two'

    client = MongoClient(mongodb_uri)
    db = client[mongodb_db]
    db[collection].delete_many({})
    
if __name__ == "__main__":
    main()