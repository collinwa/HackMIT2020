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
}

async function retrieveUser(userId) {
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
}

async function updateUser(userId, newParam) {
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
}

async function updateOrInsert(username, newParams) {
    const qResult = await retrieveUser(username);
    if (qResult !== null) {
        console.log("RIP")
        updateUser(username, newParams);
    }
    else {
        console.log("POG");
        insertUser({...{name: username}, ...newParams});
    }
}

module.exports = {insertUser, retrieveUser, updateUser, deleteUser, deleteManyByQuery, updateOrInsert};

// insertUser({id: 35, name: "Bob", occupation: "Builder"});
// retrieveUser(35);
// updateUser(35, {occupation: "Unemployed"});
// deleteUser({id: 35});