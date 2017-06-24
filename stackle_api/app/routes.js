// application -------------------------------------------------------------
var mongoose = require('mongoose');

var User = require('./models/user');
var Post = require('./models/post');
var Stack = require('./models/stack');

module.exports = function(app,db){
	//api
	app.get('/api/login/', function(req,res){
	})

	app.get('/home', function(req,res){
		console.log("Working");

		res.end();
	})

	app.post('/user/post', function(req,res){

		var post = new Post(req.body);

		post.save(function(err, post){
			if(err)
				console.log("error saving the post");
		});
		// console.log(post.title);
		res.send("works!");
	})

	app.get('/api/posts', function(req,res){
		
	})

	app.get('/api/:org_id', function(req,res){

	})

	app.get('/api/notifications', function(req,res){
		
	})

	app.get('/api/')

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});

}
