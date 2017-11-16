/*
* Taken from  http://docs.mongodb.org/ecosystem/drivers/node-js/
 * A Node script  connecting to a MongoDB database given a MongoDB Connection
URI.
*/

var mongodb = require('mongodb');
var app = express();

// Create seed data -- it is in JSON format
var seedData = [
    {
        FirstName: req.app.get('firstName')
        //billing: '5555555',
        //shipping: 'Island',

    }
];

// Standard URI format:  mongodb://[dbuser:dbpassword@]host:port/dbname
// GO TO mLab.com account to see what YOUR database URL is
//CHANGE the url so it is correct for your account
var uri ='mongodb://steven:steven@ds259175.mlab.com:59175/songscs3520';

//using mongodb module
mongodb.MongoClient.connect(uri, function(err, db) {

    if(err) throw err;

    /*
     * First we'll add a  few songs. Nothing is required to create the
     * songs collection;  it is created automatically when we insert.
     */
    var Customers =  db.collection('Customers');

    // Note that the  insert method can take either an array or a dict.
    Customers.insert(seedData, function(err, result) {
        if(err) throw err;

        /*
         * Then we need to  give Boyz II Men credit for their contribution
         * to the hit  "One Sweet Day".
         */

    });
});