const express = require('express');
const app = express();
const path = require('path');
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose'); 
var database = require('./config/database');            // load the database config
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use('/', express.static(__dirname +  '/'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + './index.html'));
});

const hostname = 'localhost';


const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);  
});

mongoose.connect(database.url,function(err){
    if(err){
        return console.log(err);
    }
    console.log("Mongo connect sucess!");
    app.listen(port, function(){
        console.log("App listening on port " + port);
    });
    
});     // connect to mongoDB database on modulus.io
   
  


