require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
var port     = process.env.PORT || 3000;

app.use('/', express.static(__dirname +  '/'));
const mongoose = require('mongoose');
const database = require('./config/database');            // load the database config
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const db = mongoose.connection;
const cors = require("cors");
const postRouter = require('./app/routes/post');
const commentRouter = require('./app/routes/comment');
const userRouter = require('./app/routes/user');
const stackRouter = require('./app/routes/stack');
const passport = require('./app/lib/passport');
const authConfig = require('./config/auth');
const returnWithResponse = require('./app/lib/returnWithResponse');
const UserModel = require('./app/models/user');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

//Initalizing passport engine
app.use(passport.initialize());

//Protecting every Post Request 
app.post('*',passport.authenticate('bearer', { session: false, failWithError: true }), function(req, res, next){
    console.log('Success');
    next();   
}, function(err, req ,res, next){
  console.log('Failed');
   returnWithResponse.configureReturnData({status: 400 , success: false, result: 'Access-Denied ! ' + err.toString()} ,res);
});

//Basic Routes
//serving static index.html file using middleware
app.use('/', express.static(__dirname + '/'));
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);
app.use('/api/user', userRouter);
app.use('/api/org', stackRouter);

//Auth and its callback
app.get('/auth/github', passport.authenticate('github', {session: false}));
app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect : '/', failWithError: true, session: false}), function(request,response){
    returnWithResponse.configureReturnData({status: 200, success: true, result: {token: request.user.token, userId: request.user.userId}}, response);
}, function(err, request , response){
    returnWithResponse.configureReturnData({status: 400, success: false, result: 'Authentication Failed'}, response);
});

//logout
app.get('/logout' , function(request, response){
    UserModel.logout(request, response);
});

app.get('/api/profile',passport.authenticate('bearer', { session: false, failWithError: true }), function(req, res, next){
    returnWithResponse.configureReturnData({status: 200 , success: true, result: req.user} ,res);   
}, function(err, req ,res, next){
   returnWithResponse.configureReturnData({status: 400 , success: false, result: 'Access-Denied!'} ,res);
});

var routes = require("./app/routes");
routes(app, db);

// Commenting our code for custom middleware
/* app.use(function (err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8082");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.error(err.stack);
    res.status(500).send('Something broke!')
});*/

// Add option { useMongoClient: true } if mongoose version < 5
var option = database.option(mongoose.version);

mongoose.connect(database.url, option, function (err) {
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
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    if (process.env.NODE_ENV !== "DEVELOPMENT") {
        res.send(`<h1>Error Code: ${err.status || 500}</h1>`);
    } else {
        res.send(`<h1>Error Code: ${err.status || 500}</h1><br><p>${err.stack}</p>`);
    }
});

module.exports = app;
