// Users is a PRIVATE variable, only available within the scope of models/users.js

/*
  {
    name_first:"Bill"
    ,name_last:"Smith"
    ,email:"bill@smi.th"
    ,role:"member"
    ,pass:"12345"
  }
*/

var mongo = require('mongodb')
,Db = mongo.Db
,Connection = mongo.Connection
,Server = mongo.Server;


var db = new Db('test', new Server("127.0.0.1", Connection.DEFAULT_PORT, {}));


var hash = function (string) {
  var crypto=require('crypto');
  var sha = crypto.createHash('sha1');
  sha.update(string);
  var hash = sha.digest('hex');
  return hash;
};


var UsersModel = {
 
  list:function (callback) {
    
    db.open(function(err, db) {
    if (err) {
        console.log(err, db)
    } else {
      
      db.collection('users', function(err, collection) {
        
        collection.find().toArray(function(err, results) {
        sys.puts(results);
          
          db.close();
          callback(results);
          
        });
        
      });
      
      }
       
    }); // db.
      
  }, // list()
  
  detail:function (callback) {
    
    db.open(function(err, db) {
    if (err) {
       console.log(err, db)
    } else {
      
      db.collection('users', function(err, collection) {
        
        collection.find({'_id':o_id}, function(err, results) {
        
          db.close();
          callback(results);
          
        });
        
      });
      }
      
    }); // db.
      
  }, // detail()
  
  create:function (data) {

    data.pass = hash(data.pass);
    
    if (data.email && data.name_first && data.name_last) {
      Users.push(data);
      return true;
    }
    
    return false;
  
  }

,edit:function (req, res) {}
  ,del:function (req, res) {}
  
};

// make UsersModel PUBLICLY available to other code OUTSIDE the scope of models/users.js
// by assigning to module.exports
module.exports = UsersModel;