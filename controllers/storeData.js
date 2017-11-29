var express = require('express');
var app = express();
var router = express.Router();
var mongodb = require('mongodb');


//module.exports.storeData =  function (request, response) {

router.post('/storeData', function (req, res, next) {

    //Randomized values
    var customerID = Math.floor((Math.random() * 1000000000000) + 1);
    var billingID = Math.floor((Math.random() * 1000000000000) + 1);
    var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
    var orderID = Math.floor((Math.random() * 10000) + 1);

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

    //Billing default values
    var card = " ";
    var cardNum = " ";
    var cvv = " ";
    var expireMM = " ";
    var expireYY = " ";
    var cardZip = " ";
    var cardName = " ";


    //Credit Card expiration date in the format MM/YY
    var cardExp = req.body.expireMM + "/" + req.body.expireYY;

    //Post Data from finalOrder.php
    fName = req.body.fName;
    lName = req.body.lName;
    addr1 = req.body.addr1;
    addr2 = req.body.addr2;
    city = req.body.city;
    state = req.body.state;
    zip = req.body.zip;
    phone = req.body.phone;
    email = req.body.email;

    card = req.body.card;
    cardNum = req.body.cardNum;
    cvv = req.body.cvv;
    cardName = req.body.cardName;
    cardZip = req.body.cardZip;

    var date = req.body.date;
    var origPrice = req.body.totalPrice;





    //NOTE! 'products' is 1 long string of all product information
    //will be tokenized and later
    var products = req.body.products;


    var ship = req.body.ship;
    var tax = (+origPrice * 0.08);
    var totalPrice = +origPrice + +ship + +tax;

    var items = req.body.itemNames;


    //Places item names into arrays to later be used in output
    var nameAry = items.split(', ');


    var emptyCart = req.body.emptyCart;

    var status;

    if(emptyCart === 'true' )
    {
        status = 'Order Not Successful';
    }

    else
    {
        status = 'Order Successful\nTHANK YOU FOR YOUR SUBMITTED ORDER';
    }






    /********************************************************************************************************
    //Extracting Algorithm STARTS
     //
     //This Code is used to extract the incoming values of 'Product_Vector'
    // and conveniently storing them into 3 separate arrays that could later be iterated over to get the values.
    ////Related data are tied to same indices
    //*******************************************************************************************************/

        //3 parallel arrays, same data is related by the same array indices
    var prodIDAry = [];
    var quantAry = [];
    var priceAry = [];


    var start_pos; //Starting Position
    var end_pos = 0; //Ending Position the substring in between will be extracted
    var cur_pos = 0; //cur_pos, used to make sure starting position does not reset

    //If cart is empty nothing is stored into the mlab database
    //and an error message will be relayed to the user if they try to submit the order,
    if (emptyCart === 'false')
    {

        while ( true )
        {
            //finds and sets the initial index to extract substring of "products"
            start_pos = products.indexOf('ProductID_', end_pos) + 10;

            //checker to break, because indexof will loop infinitely looking for substring occurrences
            if(cur_pos > start_pos)
            {
                break;
            }
            cur_pos = start_pos;
            end_pos = products.indexOf(',', start_pos);

            //All products IDs are extracted to be used in the output
            prodIDAry.push(products.substring(start_pos, end_pos));

        }

        //RESETS substring substring positioning for next iteration
        end_pos = 0;
        cur_pos = 0;

        while ( true )
        {

            start_pos = products.indexOf('Quantity', end_pos) + 8;

            if(cur_pos > start_pos)
            {
                break;
            }

            cur_pos = start_pos;
            end_pos = products.indexOf(',', start_pos);

            //Quantity data
            quantAry.push(products.substring(start_pos, end_pos));


    }

        end_pos = 0;
        cur_pos = 0;

        while ( true )
        {
            start_pos = products.indexOf('Price', end_pos) + 5;

            if(cur_pos > start_pos)
            {
                break;
            }

            cur_pos = start_pos;
            end_pos = products.indexOf('}', start_pos);

            //Price data is stored into its own array.
            priceAry.push(products.substring(start_pos, end_pos));
    }
    /******************************************************************************************************
    //*** Extracting Algorithm Ends
    //*******************************************************************************************************/



        // Create seed data -- it is in JSON format
        //this data is uploaded onto mongoDB, into 3 separate collections
        var seedCust = [
            {
                _id: customerID,
                FIRSTNAME: fName,
                LASTNAME: lName,
                STREET: addr1,
                CITY: city,
                STATE: state,
                ZIP: zip,
                PHONE: phone,
                EMAIL: email

            }
        ];

        var seedShip = [
            {
                _id: shippingID,
                CUSTOMER_ID: customerID,
                FIRSTNAME: fName,
                LASTNAME: lName,
                Address1: addr1,
                Address2: addr2,
                SHIPPING_CITY: city,
                SHIPPING_STATE: state,
                SHIPPING_ZIP: zip

            }
        ];

        var seedBill = [
            {
                _id: billingID,
                CUSTOMER_ID: customerID,
                CREDITCARDTYPE: card,
                CREDITCARDNUM: cardNum,
                CREDITCARDEXP: cardExp,
                CREDITCARDSECURITYNUM: cvv,
                CARD_NAME: cardName
                //CardZip: cardZip

            }
        ];

        var seedOrder = [
            {
                _id: orderID,
                CUSTOMER_ID: customerID,
                BILLING_ID: billingID,
                SHIPPING_ID: shippingID,
                DATE: date,

                //Not actually a vector, but a single long string, in the required format
                PRODUCT_VECTOR: products,

                ORDER_TOTAL: totalPrice

            }
        ];


// Standard URI format:  mongodb://[dbuser:dbpassword@]host:port/dbname
// GO TO mLab.com account to see what YOUR database URL is
//CHANGE the url so it is correct for your account
        var uri = 'mongodb://steven:steven@ds259175.mlab.com:59175/songscs3520';

//using mongodb module
        mongodb.MongoClient.connect(uri, function (err, db) {

            if (err) throw err;

            //Creating 3 separate collections to store data
            var custInfo = db.collection('CUSTOMER');
            var shipping = db.collection('SHIPPING');
            var billing = db.collection('BILLING');
            var order = db.collection('ORDERS');

            //inserting info into the database
            custInfo.insert(seedShip, function (err, result) {
                if (err) throw err;
            });

            shipping.insert(seedCust, function (err, result) {
                if (err) throw err;
            });

            billing.insert(seedBill, function (err, result) {
                if (err) throw err;
            });
            order.insert(seedOrder, function (err, result) {
                if (err) throw err;
            });

            //close connection when your app is terminating.
            db.close(function (err) {
                if(err) throw err;
            });

        });

    }

    //sends all output variables to storeData.ejs to be outputted
    res.render('storeData',{

        fName: fName,
        lName: lName,
        addr1: addr1,
        addr2: addr2,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
        email: email,

        card: card,
        cardNum: cardNum,
        cvv: cvv,
        cardName: cardName,
        cardZip: cardZip,

        date: date,

        origPrice: origPrice,
        tax: tax,
        totalPrice: totalPrice,

        ship: ship,

        products: products,

        prodID: prodIDAry,
        quant: quantAry,
        price: priceAry,

        itemNames: nameAry,

        status:status

    });

});



module.exports = router;