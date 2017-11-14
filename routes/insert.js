/*
* Taken from  http://docs.mongodb.org/ecosystem/drivers/node-js/
 * A Node script  connecting to a MongoDB database given a MongoDB Connection
URI.
*/

var mongodb = require('mongodb');

// Create seed data -- it is in JSON format
var seedData = [
    {
        name: 'Steven',
        billing: '5555555',
        shipping: 'Island',

    },
    {
        name: 'Debbie',
        billing: '23213123',
        shipping: 'LAND',
    },
    {
        name: 'Steph',
        billing: 'Yukon dr',
        shipping: 'animas dr',
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
    var Orders =  db.collection('Orders');

    // Note that the  insert method can take either an array or a dict.
    Orders.insert(seedData, function(err, result) {
        if(err) throw err;

        /*
         * Then we need to  give Boyz II Men credit for their contribution
         * to the hit  "One Sweet Day".
         */
        Orders.update(
            { name: 'Steven' },
            { $set: {  billing: 'Mariah Carey ft. Boyz II Men' } },
            function (err,  result) {
                if(err) throw  err;
                /*
                 * Finally we  run a query which returns all the hits that spend 10 or
                 * more weeks  at number 1.
                 */

            }
        );
    });
});