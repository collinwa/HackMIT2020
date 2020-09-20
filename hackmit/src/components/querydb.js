const { MongoClient } = require('mongodb');


async function insertUser(userId, newParam) {
    const url = 'mongodb+srv://sahilsuneja:hackmit2020@hackmitcluster.uxzey.mongodb.net/ZoomDB?retryWrites=true&w=majority';
    const dbName = "ZoomDB";
    const colName = "channelPointData";

    const client = await new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log(url);
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        await col.insertOne({name: userId, channelPoints: newParam});
        return {};
    }
    catch(err){
        console.log(err);
    }
    finally {
        await client.close();
    }
}

async function retrieveUser(userId) {
    const url = 'mongodb+srv://sahilsuneja:hackmit2020@hackmitcluster.uxzey.mongodb.net/ZoomDB?retryWrites=true&w=majority';
    const dbName = "ZoomDB";
    const colName = "channelPointData";

    const client = await new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
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
    const url = 'mongodb+srv://sahilsuneja:hackmit2020@hackmitcluster.uxzey.mongodb.net/ZoomDB?retryWrites=true&w=majority';
    const dbName = "ZoomDB";
    const colName = "channelPointData";
    const client = await new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection(colName);
        let currentChannelPoints = await col.findOne({name: userId}).channelPoints;
        await col.updateOne({name: userId}, {$set: {channelPoints: currentChannelPoints + newParam}});
    }
    catch(err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
}

async function deleteUser(query) {
    const url = 'mongodb+srv://sahilsuneja:hackmit2020@hackmitcluster.uxzey.mongodb.net/ZoomDB?retryWrites=true&w=majority';
    const dbName = "ZoomDB";
    const colName = "channelPointData";
    const client = await new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
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
    const url = 'mongodb+srv://sahilsuneja:hackmit2020@hackmitcluster.uxzey.mongodb.net/ZoomDB?retryWrites=true&w=majority';
    const dbName = "ZoomDB";
    const colName = "channelPointData";
    const client = await new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});
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