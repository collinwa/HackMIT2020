const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://sahilsuneja:hackmit2020@hackmitcluster.uxzey.mongodb.net/ZoomDB?retryWrites=true&w=majority';


const dbName = "ZoomDB";
const colName = "channelPointData";

async function insertUser(newUser) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
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
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        return await col.findOne({name: userId});
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
}

async function updateUser(userId, newParam) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        await col.updateOne({name: userId}, {$set: newParam});
    }
    catch(err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
}

async function deleteUser(query) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
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
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
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

async function updateOrInsert(username, incValue) {
    const qResult = await retrieveUser(username);
    console.log(qResult);
    if (!qResult) {
        insertUser({name: username, channelPoints: incValue});
    }
    else {
        let channelPoints = qResult.channelPoints + incValue;
        updateUser(username, {channelPoints: channelPoints});
    }
    
}

module.exports = {insertUser, retrieveUser, updateUser, deleteUser, deleteManyByQuery, updateOrInsert};

// insertUser({id: 35, name: "Bob", occupation: "Builder"});
// console.log(retrieveUser(35));
// updateUser(35, {occupation: "Unemployed"});
// deleteUser({id: 35});

updateOrInsert("Bob", 10);