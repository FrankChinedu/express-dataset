var Datastore = require('nedb');
var db = new Datastore({ filename: 'db/database.db', autoload: true });

module.exports = db;