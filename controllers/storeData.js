var express = require('express');
var app = express();
var router = express.Router();
var mongodb = require('mongodb');




    router.post('/storeData', function (req, res, next) {

        //Shipping default values
        var fName = "";  //retrieve the data associated with name
        var lName = "";
        var addr1 = "";
        var addr2 = "";
        var city = "";
        var state = "";
        var zip = "";
        //var phone = "";


        fName = req.body.fName;
        lName = req.body.lName;
        addr1 = req.body.addr1;
        addr2 = req.body.addr2;
        city = req.body.city;
        state = req.body.state;
        zip = req.body.zip;
        //phone = req.body.phone;

        var customerID = Math.floor((Math.random() * 1000000000000) + 1);

        //app.set('firstName', firstName);

        //var value_name = req.params.name;  //retrieve the data associated with name

        //res.render('readOrderAndRespond',
        //{firstName: firstName, lastName: lastName, addr1: addr1, city:city})


        // Create seed data -- it is in JSON format
        var seedData = [
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
            var Shipping = db.collection('Shipping');

            // Note that the  insert method can take either an array or a dict.
            Shipping.insert(seedData, function (err, result) {
                if (err) throw err;

                /*
                 * Then we need to  give Boyz II Men credit for their contribution
                 * to the hit  "One Sweet Day".
                 */

            });
        });

    });
module.exports = router;