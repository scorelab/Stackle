// application -------------------------------------------------------------
var mongoose = require('mongoose');

var User = require('./models/user');
var Stack = require('./models/stack');

var postModels = require('./models/post')

var Post = postModels.Post;
var Comment = postModels.Comment;
var Reply = postModels.Reply;

module.exports = function(app,db){

	//api
	app.get('/api/login/', function(req,res){
	})

	app.get('/home', function(req,res){
		
		

		res.end();
	})

	//get all posts
	app.get('/api/posts', function(req,res){

		Post.find({}, function(err, posts){
			if(err)
				console.log("Cant get all posts!")
			res.send(posts);
		})
	})

	//save a post
	app.post('/user/post', function(req,res){ 

		var post = new Post(req.body);

		post.save(function(err, post){
			if(err)
				console.log("error saving the post");
		});

		res.end();
	})

	//returns posts by a specific user
	app.get('/api/posts/:user', function(req,res){ 
		var id = req.params.user;

		Post.find( { user : id } , function(err,posts){
			if(err)
				console.log("Erorr getting posts");

			res.send(posts);
		})

	})

	//returns posts relating to specific org
	app.get('/api/:org_name', function(req,res){

		var orgname  = req.params.org_name;

		Post.find( { org_name : orgname } , function(err, posts){
			if(err)
				console.log(`Error getting posts from $orgname`);

			res.send(posts);
		})

	})

	//comment on a post
	app.post('/comment/:postid', function(req,res){

		var postid = req.params.postid;
		var query = { _id : postid };

		var comment = new Comment(req.body);

		Post.update( query , { comments : []});

		comment.save
	})

	app.get('/api/notifications', function(req,res){
		
	})


	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});

}
