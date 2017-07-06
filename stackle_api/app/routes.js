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
		//needs to intergrate with github for implementation

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
	app.post('/api/user/post', function(req,res){ 

		var post = new Post(req.body);

		post.save(function(err, post){
			if(err){
				console.log("error saving the post");
				res.send("error!")
			}else{
				res.send("Sucessfully saved the post!");
			}
		});
	})

	//delete a post by ID
	app.delete('/api/delete/post/:postid', function(req,res){
		var postid = req.params.postid;

		Post.remove({ _id: postid} , function(err,success){
			if(err){
				console.log(err);
				res.send("Error deleting the document");
			}else if(success){
				res.send("Sucessfully Deleted");
			}else{
				console.log("Null pointer");
			}

		})
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
			else
				res.send(posts);
		})

	})

	//comment on a post
	app.post('/api/comment/:postid', function(req,res){

		var postid = req.params.postid;
		var query = { _id : postid };

		var comment = new Comment(req.body);

		Post.update( query , { comments : []});

		
	})

	//get all stacks (orgs)
	app.get('api/orgs', function(req,res){

		Stack.find({}, function(err, stacks){
			if(err)
				console.log("Errors retrieving stacks!");
			else
				res.send(stacks);
		})
	})

	//create stack
	app.post('/api/newstack', function(req,res){

		var stack = new Stack(req.body);

		stack.save(function(err, stack){
			if(err){
				console.log("Error saving the stack to database");
				res.send("Error saving stack!");
			}else{
				res.send("Sucessfully created the stack");
			}
		})
	})

	//create user
	app.post('/api/newuser' , function(req ,res){
		 var user = new User(req.body);

		 user.save(function(err , user){
		 	if(err){
		 		console.log("Error saving the stack to database");
		 		res.send("Error saving user!");
		 	}else{
		 		res.send("Sucessfully created the user");
		 	}
		 })
	})

	app.get('/api/notifications', function(req,res){
		
	})


	app.get('/*', function(req, res) {
		res.sendfile('./public/404.html'); 
	});

}
