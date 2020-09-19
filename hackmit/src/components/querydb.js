const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://sahilsuneja:hackmit2020@hackmitcluster.uxzey.mongodb.net/ZoomDB?retryWrites=true&w=majority';
const client = new MongoClient(url, {useUnifiedTopology: true});

const dbName = "ZoomDB";
const colName = "channelPointData";

async function insertUser(newUser) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        await col.insertOne(newUser);
    }
    catch(err){
        console.log(err);
    }
    finally {
        await client.close();
    }
}

async function retrieveUser(userId) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        await col.findOne({id: userId});
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
}

async function updateUser(userId, newParam) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        await col.updateOne({id: userId}, {$set: newParam});
    }
    catch(err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
}

async function deleteUser(query) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        await col.deleteOne(query);
    }
    catch(err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
}

async function deleteManyByQuery(query) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        await col.deleteMany(query);
    }
    catch(err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
}

module.exports = {insertUser, retrieveUser, updateUser, deleteUser, deleteManyByQuery};

// insertUser({id: 35, name: "Bob", occupation: "Builder"});
// retrieveUser(35);
// updateUser(35, {occupation: "Unemployed"});
deleteUser({id: 35});