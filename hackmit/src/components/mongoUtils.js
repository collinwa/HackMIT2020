const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://sahilsuneja:hackmit2020@hackmitcluster.uxzey.mongodb.net/ZoomDB?retryWrites=true&w=majority';

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( uri,  { useNewUrlParser: true, useUnifiedTopology: true }, function( err, client ) {
      _db  = client.db('ZoomDB');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};