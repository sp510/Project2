var express = require('express');
var app = express();
var router = express.Router();
var mongodb = require('mongodb');




    router.post('/storeData', function (req, res, next) {

        var customerID = Math.floor((Math.random() * 1000000000000) + 1);

        //Shipping default values
        var fName = " ";  //retrieve the data associated with name
        var lName = " ";
        var addr1 = " ";
        var addr2 = " ";
        var city = " ";
        var state = " ";
        var zip = " ";
        var phone = " ";
        var email = " ";

        var card = " ";
        var cardNum = " ";



        fName = req.body.fName;
        lName = req.body.lName;
        addr1 = req.body.addr1;
        addr2 = req.body.addr2;
        city = req.body.city;
        state = req.body.state;
        zip = req.body.zip;
        phone = req.body.phone;
        email = req.body.email;





        // Create seed data -- it is in JSON format
        var seedCust = [
            {
                _id: customerID,
                FirstName: fName,
                LastName: lName,
                Address1: addr1,
                Address2: addr2,
                City: city,
                State: state,
                Zip: zip

            }
        ];

        var seedShip = [
            {
                _id: customerID,
                FirstName: fName,
                LastName: lName,
                Address1: addr1,
                Address2: addr2,
                City: city,
                State: state,
                Zip: zip

            }
        ];

        var seedBill = [
            {
                _id: customerID,
                FirstName: fName,
                LastName: lName,
                Address1: addr1,
                Address2: addr2,
                City: city,
                State: state,
                Zip: zip

            }
        ];


// Standard URI format:  mongodb://[dbuser:dbpassword@]host:port/dbname
// GO TO mLab.com account to see what YOUR database URL is
//CHANGE the url so it is correct for your account
        var uri = 'mongodb://steven:steven@ds259175.mlab.com:59175/songscs3520';

//using mongodb module
        mongodb.MongoClient.connect(uri, function (err, db) {

            if (err) throw err;

            /*
             * First we'll add a  few songs. Nothing is required to create the
             * songs collection;  it is created automatically when we insert.
             */
            var custInfo = db.collection('CUSTOMER');
            var shipping = db.collection('SHIPPING');
            var billing = db.collection('BILLING');

            // Note that the  insert method can take either an array or a dict.
            shipping.insert(seedCust, function (err, result) {
                if (err) throw err;
            });

            custInfo.insert(seedShip, function (err, result) {
                if (err) throw err;
            });

            billing.insert(seedBill, function (err, result) {
                if (err) throw err;
            });


        });

    });





    module.exports = router;