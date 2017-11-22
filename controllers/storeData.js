var express = require('express');
var app = express();
var router = express.Router();



    var storeData = router.post('/storeData', function(req, res, next) {

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
