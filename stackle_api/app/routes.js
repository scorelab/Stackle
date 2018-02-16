// application -------------------------------------------------------------
var mongoose = require('mongoose');

var User = require('./models/user');
var Stack = require('./models/stack');

var postModels = require('./models/post')

var Post = postModels.Post;
var Comment = postModels.Comment;
var Reply = postModels.Reply;

module.exports = function (app, db) {

	//api
	app.get('/api/login/', function (req, res) {
	})

	app.get('/home', function (req, res) {
		//needs to intergrate with github for implementation
		res.end();
	})

	//get all posts
	app.get('/api/posts', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		Post.find({}, function (err, posts) {
			if (err)
				console.log("Cant get all posts!")
			res.status(200).send(posts);
		})
	})

	//save a post
	app.post('/api/user/post', function (req, res) {
		var post = new Post(req.body);
		post.save(function (err, post) {
			if (err) {
				console.log("error saving the post");
				res.status(500).send("error!")
			} else {
				res.status(201).send("Sucessfully saved the post!");
			}
		});
	})

	//get a post by id
	app.get('/api/post/:postid', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		var objectid = req.params.postid;
		Post.findOne({ _id: objectid }, function (err, post) {
			if (err) {
				res.status(404).send(err);
			} else {
				res.status(200).send(post);
			}
		})
	})

	//delete a post by ID
	app.delete('/api/post/:postid', function (req, res) {
		var postid = req.params.postid;
		Post.remove({ _id: postid }, function (err, success) {
			if (err) {
				console.log(err);
				res.status(500).send("Error deleting the document");
			} else if (success) {
				res.status(200).send("Sucessfully Deleted");
			} else {
				console.log("Null pointer");
			}
		})
	})

	//returns posts by a specific user
	app.get('/api/posts/:user', function (req, res) {
		var id = req.params.user;
		Post.find({ user: id }, function (err, posts) {
			if (err)
				console.log("Erorr getting posts");
			res.status(200).send(posts);
		})
	})

	//returns posts relating to specific org
	app.get('/api/posts/org/:org_name', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		var orgname = req.params.org_name;
		Post.find({ org_name: orgname }, function (err, posts) {
			if (err)
				console.log(`Error getting posts from $orgname`);
			else
				res.status(200).send(posts);
		})
	})

	//get a specific org
	app.get('/api/org/:orgname', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		var orgname = req.params.orgname;
		Stack.find({ name: orgname }, function (err, org) {
			if (err) {
				console.log('Error');
			} else {
				res.status(200).send(org);
			}
		})
	})

	//comment on a post
	app.post('/api/comment/:postid', function (req, res) {
		var postid = req.params.postid;
		var query = { _id: postid };
		var comment = new Comment(req.body);
		Post.update(query, { comments: [] });
	})

	//get all stacks (orgs)
	app.get('/api/orgs', function (req, res) {
		Stack.find({}, function (err, stacks) {
			if (err)
				console.log("Errors retrieving stacks!");
			else
				res.status(200).send(stacks);
		})
	})

	//create stack
	app.post('/api/stack/create', function (req, res) {
		var stack = new Stack(req.body);
		stack.save(function (err, stack) {
			if (err) {
				console.log("Error saving the stack to database");
				res.status(500).send("Error saving stack!");
			} else if (stack) {
				res.status(201).send("Sucessfully created the stack");
			} else {
				res.status(500).send("Null");
			}
		})
	})

	//delete stack
	app.delete('api/delete/stack/:stackid', function (req, res) {
		var stack_id = req.params.stackid;
		Stack.remove({ _id: stack_id }, function (err, success) {
			if (err) {
				res.status(500).send("Couldn't delete Stack");
			} else {
				res.status(200).send("");
			}
		})
	})

	//user subscribing to an stack
	app.post('/api/subscribe', function (req, res) {
		var userid = req.body.uid;
		var stackname = req.body.stack_name;
		var query = { userId : userid };
		User.findOneAndUpdate(query, {$push: {subscribed_stacks : stackname}}, function(err, noaffected){
			if(err){
				res.status(500).send("Error Updating");
			}else{
				res.status(200).send("Success!!");
			}
		});
	})

	//getting subscribed stacks for a user
	app.get('/api/stack/subscribed/:userid', function(req ,res){
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		User.findOne({userId : req.params.userid}, function(err, result){
			if(err){
				res.status(500).send(err);
			}else if(result){
				var sub_stack = result.subscribed_stacks;
				res.status(200).send(sub_stack);
			}else{
				res.status(500).send("Can't get!");
			}
		})
	})

	//create user
	app.post('/api/newuser', function (req, res) {
		var user = new User(req.body);
		user.save(function (err, user) {
			if (err) {
				console.log("Error saving the stack to database");
				res.status(500).send("Error saving user!");
			} else {
				res.status(201).send("Sucessfully created the user");
			}
		})
	})

	app.get('/api/notifications', function (req, res) { });

	app.get('/*', function (req, res) {
		res.sendfile('./public/404.html');
	});

}
