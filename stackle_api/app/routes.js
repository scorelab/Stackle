// application -------------------------------------------------------------
const User = require('./models/user');
const Stack = require('./models/stack');


const postController = require('./controllers/post-controller')

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

	/*    Routes to Handle Post      */
	
	//get all posts
	app.get('/api/posts', postController.getAll)

	//save a post
	app.post('/api/user/post', postController.savePost)

	//get a post by id
	app.get('/api/post/:postid', postController.getOne)

	//delete a post by ID
	app.delete('/api/post/:postid', postController.deletePost)

	//returns posts by a specific user
	app.get('/api/posts/:user', postController.getPostByUser)

	//returns posts relating to specific org
	app.get('/api/posts/org/:org_name', postController.getPostByOrganization)

	/* End of Routes for Posts */


	//get a specific org
	app.get('/api/org/:orgname', function (req, res) {

		let orgname = req.params.orgname;
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
			else
				res.status(200).send(stacks);
		})
	})

	//create stack
	app.post('/api/stack/create', function (req, res) {
		let stack = new Stack(req.body);
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
		let stack_id = req.params.stackid;
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
		let userid = req.body.uid;
		let stackname = req.body.stack_name;
		let query = { userId: userid };
		User.findOneAndUpdate(query, { $push: { subscribed_stacks: stackname } }, function (err, noaffected) {
			if (err) {
				res.status(500).send("Error Updating");
			} else {
				res.status(200).send("Success!!");
			}
		});
	})

	//getting subscribed stacks for a user
	app.get('/api/stack/subscribed/:userid', function (req, res) {

		User.findOne({ userId: req.params.userid }, function (err, result) {
			if (err) {
				res.status(500).send(err);
			} else if (result) {
				let sub_stack = result.subscribed_stacks;
				res.status(200).send(sub_stack);
			} else {
				res.status(500).send("Can't get!");
			}
		})
	})

	//create user
	app.post('/api/newuser', function (req, res) {
		let user = new User(req.body);
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

}
