var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World!' });
});

/*
//########################################
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode
//#########################################

// GET with  URI  /read/Lynne   which means name=Lynne
router.post('/readNameAndRespond', function(req, res, next) {

*/
    //expecting data variable called name --retrieve value using body-parser
    //var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    //var params = JSON.stringify(req.params);//if wanted parameters
    //expecting data variable called name --retrieve value using body-parser

    var value_name = req.body.name;  //retrieve the data associated with name

    //var value_name = req.params.name;  //retrieve the data associated with name

    //res.render('readNameAndRespond', {outputName: req.params.name })

    res.send("hello " + value_name);
})


module.exports = router;
