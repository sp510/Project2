var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://steven:steven@ds259175.mlab.com:59175/songscs3520';
var express = require('express');
var router = express.Router();




/** getAllRoutes controller logic that current does model logic too -connects to Mongo database and
 * queries the Routes collection to retrieve all the routes and build the output usig the
 * ejs template mongodb.ejs found in views directory
 * @param request
 * @param response
 *
 */

module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        //get collection of routes
        var Customers = db.collection('Shipping');


        //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        var c = Customers.find({});


        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just  loging the output to the console
            }
        );


        //SECOND -show another way to make request for ALL Orders  and simply collect the  documents as an
        //   array called docs that you  forward to the  getAllRoutes.ejs view for use there
        Customers.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('getAllOrders', {results: docs});

        });


        //Showing in comments here some alternative read (find) requests
        //this gets Orders where frequency>=10 and sorts by name
        // Orders.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Orders by name
        //  Orders.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {


        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function



module.exports.storeData =  function (request, response) {


    router.post('/storeData', function(req, res, next) {

        var fName = req.body.firstName;  //retrieve the data associated with name
        var lName = req.body.lastName;
        var addr1 = req.body.addr1;
        //var addr2 = req.body.addr2;
        var city = req.body.city;
        //var state = req.body.state;

        //app.set('firstName', firstName);

        //var value_name = req.params.name;  //retrieve the data associated with name

        //res.render('readOrderAndRespond',
        //{firstName: firstName, lastName: lastName, addr1: addr1, city:city})


        // Create seed data -- it is in JSON format
        var seedData = [
            {
                FirstName: fName,
                LastName: lName,
                Address: addr1,
                City: city

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
            var Shipping =  db.collection('Shipping');

            // Note that the  insert method can take either an array or a dict.
            Shipping.insert(seedData, function(err, result) {
                if(err) throw err;

                /*
                 * Then we need to  give Boyz II Men credit for their contribution
                 * to the hit  "One Sweet Day".
                 */

            });
        });


    });








};
