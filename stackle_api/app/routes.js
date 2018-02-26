// application -------------------------------------------------------------
const User = require('./models/user');
const Stack = require('./models/stack');

const postModels = require('./models/post')

const Post = postModels.Post;
const Comment = postModels.Comment;

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
			if (err){
				console.log("Cant get all posts!")
				res.status(404).json({status: false, err})
			}
			else if(!err && posts.length > 0){
				res.status(200).json({status: true, posts});
			}
			else if(!err && posts.length == 0){
				err_message = "No Post Data Available";
				res.status(200).json({status: false, message: err_message});	
			}
		})
	})

	//save a post
	app.post('/api/user/post', function (req, res) {
		let post = new Post(req.body);
		post.save(function (err, post) {
			if (err) {
				error_message = "error while saving the post";
				console.log(error_message);
				res.status(500).json({status: false, message: error_message});
			} else {
				success_message = "Sucessfully saved the post!";
				res.status(201).json({status: true, message: success_message, post});
			}
		});
	})

	//get a post by id
	app.get('/api/post/:postid', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let objectid = req.params.postid;
		Post.findOne({ _id: objectid }, function (err, post) {
			if (err) {
				error_message = "error while getting the post";
				res.status(500).json({status: false, message: error_message});
			} 
			else if(!err && post) {
				res.status(200).json({status: true, post});
			}
			//if post is null
			else if(!err && !post){
				res.status(200).json({status: false, message: "Post not found"});	
			}
		})
	})

	//delete a post by ID
	app.delete('/api/post/:postid', function (req, res) {
		let postid = req.params.postid;
		Post.remove({ _id: postid }, function (err, success) {
			if (err) {
				console.log(err);
				res.status(500).json({status: false, message: "Error deleting the document"});
			} else if (success) {
				res.status(200).json({status: true, message: "Sucessfully Deleted"});
			} else {
				console.log("Null pointer");
			}
		})
	})

	//returns posts by a specific user
	app.get('/api/posts/:user', function (req, res) {
		let id = req.params.user;
		Post.find({ user: id }, function (err, posts) {
			if (err){
				console.log(`Error getting posts from user:$user`);
				res.status(500).json({status: true, message: "Error getting posts" })
			}
			else if(!err && posts.length > 0){
				res.status(200).json({status: true, posts});
			}
			else if(!err && posts.length == 0){
				err_message = "No Post Data Available";
				res.status(200).json({status: false, message: err_message});	
			}
			
		})
	})

	//returns posts relating to specific org
	app.get('/api/posts/org/:org_name', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let orgname = req.params.org_name;
		Post.find({ org_name: orgname }, function (err, posts) {
			if (err){
				console.log(`Error getting posts from $orgname`);
				res.status(500).json({status: true, message: "Error getting posts" })
			}
			else if(!err && posts.length > 0){
				res.status(200).json({status: true, posts});
			}
			else if(!err && posts.length == 0){
				err_message = "No Post Data Available";
				res.status(200).json({status: false, message: err_message});	
			}
		})
	})

	//get a specific org
	app.get('/api/org/:orgname', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let orgname = req.params.orgname;
		Stack.findOne({ name: orgname }, function (err, org) {
			if (err) {
				res.status(500).json({status: false, message: "Error while fetching detail"});
			} 
			else if(!err && org) {
				res.status(200).json({status: true, org});
			}
			//if org is NULL
			else if(!err && !org){
				res.status(500).json({status: false, message: orgname + " organisation not found !"});
			}
		})
	})

	//comment on a post
	app.post('/api/comment/:postid', function (req, res) {
		let postid = req.params.postid;
		let query = { _id: postid };
		let comment = new Comment(req.body);
		Post.update(query, { comments: [] });
	})

	//get all stacks (orgs)
	app.get('/api/orgs', function (req, res) {
		Stack.find({}, function (err, stacks) {
			if (err)
				console.log("Errors retrieving stacks!");
			else if(!err && stacks.length > 0)
				res.status(200).json({status: true, stacks});
			else if(!err && stacks.length == 0)
				res.json({status: false, message: "No Stack Data Available"});
		})
	})

	//create stack
	app.post('/api/stack/create', function (req, res) {
		let stack = new Stack(req.body);
		stack.save(function (err, stack) {
			if (err) {
				console.log("Error saving the stack to database");
				res.status(500).json({status: false, message: "Error saving stack!"});
			} else if (stack) {
				res.status(201).json({status: true, message: "Sucessfully created the stack", stack});
			} else {
				res.status(500).json({status: false, message: "Stack Creation Failed"});
			}
		})
	})

	//delete stack
	app.delete('api/delete/stack/:stackid', function (req, res) {
		let stack_id = req.params.stackid;
		Stack.remove({ _id: stack_id }, function (err, success) {
			if (err) {
				res.status(500).json({status: false, message: "Couldn't delete Stack"});
			} else {
				res.status(200).json({status: true, message: success});
			}
		})
	})

	//user subscribing to an stack
	app.post('/api/subscribe', function (req, res) {
		let userid = req.body.uid;
		let stackname = req.body.stack_name;
		let query = { userId : userid };
		User.findOneAndUpdate(query, {$push: {subscribed_stacks : stackname}}, function(err, noaffected){
			if(err){
				res.status(500).json({status: false, message: "Error Updating"});
			}else{
				res.status(200).json({status: true, message: "Success!!"});
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
				res.status(500).json({status: false, message: "Operation Failed"});
			}else if(result){
				let sub_stack = result.subscribed_stacks;
				res.status(200).json({status: true, sub_stack});
			}else{
				res.status(500).json({status: false, message: "No Data Found"});
			}
		})
	})

	//create user
	app.post('/api/newuser', function (req, res) {
		let user = new User(req.body);
		user.save(function (err, user) {
			if (err) {
				console.log("Error saving the stack to database");
				res.status(500).json({status: false, message: "Error saving user!"});
			} else {
				res.status(201).send({status: true, message: "Sucessfully created the user"});
			}
		})
	})

	app.get('/api/notifications', function (req, res) { });

	app.get('/*', function (req, res) {
		res.sendfile('./public/404.html');
	});

}
