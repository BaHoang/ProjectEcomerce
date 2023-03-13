
import { MongoClient } from "mongodb"
const dataMatching = async (req, res, next) => {

    const uri = "mongodb+srv://hoang:hoang@cluster0.vwzhu.mongodb.net?retryWrites=true&w=majority"
    const client = new MongoClient(uri)
    var idProduct = req.params.id
    try {
        await client.connect()
        var dataMatchingList = await client.db('data_phone_db_clean').collection('data_matching_two').find({idProductShop: idProduct}).toArray()    

        return res.status(200).json(dataMatchingList.sort((a, b) => Number(a.priceDiscount) - Number(b.priceDiscount)))
        
    } catch (error) {
        console.log(error)
        
        return res.status(400).json("Not found product")
    }finally {
        await client.close();
    }
}


export { dataMatching }