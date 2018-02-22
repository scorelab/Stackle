require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const database = require('./config/database');            // load the database config
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const db = mongoose.connection;

// Adding cors library for cross orgin resource sharing
const cors = require("cors")

app.use('/', express.static(__dirname + '/'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());
// Adding cors middleware to express
app.use(cors())


// No need to store it into a variable
require("./app/routes")(app, db);

// app.use(function (err, req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8082");
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     console.error(err.stack);
//     res.status(500).send('Something broke!')
// });

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
});     // connect to mongoDB database on modulus.io

module.exports = app;