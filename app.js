const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static(__dirname +'/views'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('*',function(req,res){
	res.sendfile('./views/index.html');
});

app.listen(8080);

console.log("App listening on port 8080");


// restful express routers

app.get('/api/login',function(req,res){

});