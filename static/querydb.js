const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://sahilsuneja:hackmit2020@hackmitcluster.uxzey.mongodb.net/ZoomDB?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = "ZoomDB";
const colName = "channelPointData";

async function insertData(newUser) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        await col.insertOne(newUser);
    }
    catch (err){
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}