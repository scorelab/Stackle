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
			if (err)
				console.log("Cant get all posts!")
			res.status(200).send(posts);
		})
	})

	//save a post
	app.post('/api/user/post', function (req, res, next) {
		let post = new Post(req.body);
		post.save(function (err, post) {
			if (err) {
				console.log("error saving the post");
				next(err);
			}
			res.status(201).send("Sucessfully saved the post!");
		});
	})

	//get a post by id
	app.get('/api/post/:postid', function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let objectid = req.params.postid;
		Post.findOne({ _id: objectid }, function (err, post) {
			if (err) {
				next(err);
			}
			res.status(200).send(post);
		})
	})

	//delete a post by ID
	app.delete('/api/post/:postid', function (req, res, next) {
		let postid = req.params.postid;
		Post.remove({ _id: postid }, function (err, success) {
			if (err) {
				console.log(err);
				next(err);
			} else if (success) {
				res.status(200).send("Sucessfully Deleted");
			} else {
				console.log("Null pointer");
				next(new Error("Null pointer"));
			}
		})
	})

	//returns posts by a specific user
	app.get('/api/posts/:user', function (req, res) {
		let id = req.params.user;
		Post.find({ user: id }, function (err, posts) {
			if (err)
				console.log("Erorr getting posts");
			res.status(200).send(posts);
		})
	})

	//returns posts relating to specific org
	app.get('/api/posts/org/:org_name', function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let orgname = req.params.org_name;
		Post.find({ org_name: orgname }, function (err, posts) {
			if (err) {
				console.log(`Error getting posts from $orgname`);
				next(err);
			}
			res.status(200).send(posts);
		})
	})

	//get a specific org
	app.get('/api/org/:orgname', function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let orgname = req.params.orgname;
		Stack.find({ name: orgname }, function (err, org) {
			if (err) {
				next(err);
			}
			res.status(200).send(org);
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
	app.get('/api/orgs', function (req, res, next) {
		Stack.find({}, function (err, stacks) {
			if (err) {
				next(err);
			}
			res.status(200).send(stacks);
		})
	})

	//create stack
	app.post('/api/stack/create', function (req, res, next) {
		let stack = new Stack(req.body);
		stack.save(function (err, stack) {
			if (err) {
				console.log("Error saving the stack to database");
				next(err);
			} else if (stack) {
				res.status(201).send("Sucessfully created the stack");
			} else {
				next(new Error("Null"));
			}
		})
	})

	//delete stack
	app.delete('api/delete/stack/:stackid', function (req, res, next) {
		let stack_id = req.params.stackid;
		Stack.remove({ _id: stack_id }, function (err, success) {
			if (err) {
				next(err);
			}
			res.status(200).send("");
		})
	})

	//user subscribing to an stack
	app.post('/api/subscribe', function (req, res, next) {
		let userid = req.body.uid;
		let stackname = req.body.stack_name;
		let query = { userId : userid };
		User.findOneAndUpdate(query, {$push: {subscribedStacks : stackname}}, function(err, noaffected){
			if(err) {
				next(err);
			}
			res.status(200).send("Success!!");
		});
	})

	//getting subscribed stacks for a user
	app.get('/api/stack/subscribed/:userid', function(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		User.findOne({userId : req.params.userid}, function(err, result){
			if(err){
				next(err);
			}else if(result){
				let sub_stack = result.subscribedStacks;
				res.status(200).send(sub_stack);
			}else{
				next(new Error("Can't get!"))
			}
		})
	})

	//create user
	app.post('/api/newuser', function (req, res, next) {
		let user = new User(req.body);
		user.save(function (err, user) {
			if (err) {
				console.log("Error saving the stack to database");
				next(err)
			}
			res.status(201).send("Sucessfully created the user");
		})
	})

	app.get('/api/notifications', function (req, res) { });

}
