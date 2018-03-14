require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const database = require('./config/database');            // load the database config
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const users = require('./app/routes/users');
const posts = require('./app/routes/posts');
const stacks = require('./app/routes/stacks');
const general = require('./app/routes/general');

app.use('/', express.static(__dirname + '/'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes
app.use('/api/users',users); // routes for users
app.use('/api/posts',posts); // routes for posts
app.use('/api/stacks',stacks); // routes for stacks
app.use('',general); // general routes

app.use(function (err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8082");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

const options = {useMongoClient: true};

mongoose.connect(database.url, options, function (err) {
    console.log("Connecting to the database...");
    if (err) {
        console.log("\nCouldn't connect to local database. Please make sure your local mongodb server is running. \nFind more: https://github.com/scorelab/Stackle#installing-mongodb\n\nConnecting to alternative remote (mongolab) database ...");
        mongoose.connect(database.alturl, options, function (err) {
            if (err) {
                return console.log("\nCouldn't connect to remote (mongolab) database.");
            }
            return console.log("\nSuccessfully connected to remote (mongolab) database!");
        })
    } else {
        console.log("\nSuccessfully connected to local database!");
    }
});     // connect to mongoDB database on modulus.io

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});
  
// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    if(process.env.NODE_ENV !== "DEVELOPMENT") {
        res.send(`<h1>Error Code: ${err.status || 500}</h1>`);
    } else {
        res.send(`<h1>Error Code: ${err.status || 500}</h1><br><p>${err.stack}</p>`);
    }
});

module.exports = app;