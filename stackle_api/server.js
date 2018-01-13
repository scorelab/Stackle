require('dotenv').config();
const express = require('express');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var mongoose = require('mongoose');
var database = require('./config/database');            // load the database config
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

const app = express();
var subpath = express();
var db = mongoose.connection;

app.use("/v1", subpath);
var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('dist'));
// app.use('/', express.static(__dirname + '/'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

swagger.setApiInfo({
    title: "Stackle API",
    description: "Stackle API is the back end for Stackle",
    termsOfServiceUrl: "",
    contact: "pasan@scorelab.org",
    license: "Apache-2.0",
    licenseUrl: "https://github.com/scorelab/Stackle/blob/master/LICENSE"
});

var routes = require('./app/routes')(app, db);

app.use(function (err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8082");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

// Set api-doc path
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = 'localhost';
if (argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".')

// Configure the API port
var port = process.env.PORT || 8080;
if (argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.')

// set the application URL
var applicationUrl = 'http://' + domain + ':' + port;

swagger.configure(applicationUrl, '1.0.0');

mongoose.connect(database.url, function (err) {
    console.log("Connecting to the database..");
    if (err) {
        mongoose.connect(database.alturl, function (err) {
            return console.log(err);
        })
        return console.log("Couldnt connect to db url 1. connecting to alternate");
    } else {
        console.log("Mongo connect sucess!");
    }

    app.listen(port, function () {
        // console.log("App listening on port " + port);
        //display the application URL
        console.log('snapJob API running on ' + applicationUrl);
    });

});     // connect to mongoDB database on modulus.io




