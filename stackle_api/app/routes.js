/** -------------------------  application -------------------------------- */
'use strict';
const mongoose = require('mongoose');

const User = require('./models/user');
const Stack = require('./models/stack');
const postModels = require('./models/post');
const Validator = require('./lib/validator').Validator;
const returnWithResponse = require('./lib/returnWithResponse');

const Post = postModels.Post;
const Comment = postModels.Comment;
const Reply = postModels.Reply;

module.exports = function (app, db) {

	//api
	//TODO later
	app.get('/api/login/', function (request, response) {
		return returnWithResponse.configureReturnData({ status: 501, success: false, result: 'Not Implemented' }, response);
	});

	//needs to intergrate with github for implementation
	app.get('/home', function (request, response) {
		return returnWithResponse.configureReturnData({ status: 501, success: false, result: 'Not Implemented' }, response);
	});



	// get a specific organisation
	app.get('/api/org/:organisationName', function (request, response) {
		try {
			const validator = new Validator(request.params);
			const input = validator.validateGetOrganisationDetails();
			Stack.find({ name: input.organisationName }, (error, organisationDetails) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: organisationDetails }, response);
			});
		} catch (validationError) {
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});


	// get all stacks (organisation)
	app.get('/api/orgs', function (request, response) {
		Stack.find({}, (error, stacksDetails) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, success: true, result: stacksDetails }, response);
		});
<<<<<<< HEAD
	})

	//get a post by id
	app.get('/api/post/:postid', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		var objectid = req.params.postid;
		Post.findOne({ _id: objectid }, function (err, post) {
			if (err) {
				res.send(err)
			} else {
				res.send(post);
			}
		})
	})

	//delete a post by ID
	app.delete('/api/post/:postid', function (req, res) {
		var postid = req.params.postid;
		Post.remove({ _id: postid }, function (err, success) {
			if (err) {
				console.log(err);
				res.send("Error deleting the document");
			} else if (success) {
				res.send("Sucessfully Deleted");
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
			res.send(posts);
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
				res.send(posts);
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
				res.send(org);
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
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		Stack.find({}, function (err, stacks) {
			if (err)
				console.log("Errors retrieving stacks!");
			else
				res.send(stacks);
		})
	})

	//create stack
	app.post('/api/stack/create', function (req, res) {
		var stack = new Stack(req.body);
		stack.save(function (err, stack) {
			if (err) {
				console.log("Error saving the stack to database");
				res.send("Error saving stack!");
			} else if (stack) {
				res.send("Sucessfully created the stack");
			} else {
				res.send("Null");
			}
		})
	})

	//delete stack
	app.delete('api/delete/stack/:stackid', function (req, res) {
		var stack_id = req.params.stackid;
		Stack.remove({ _id: stack_id }, function (err, success) {
			if (err) {
				res.send("Couldn't delete Stack");
			} else {
				res.send("")
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
				res.send("Error Updating");
			}else{
				res.send("Success!!");
=======
	});

	// create stack
	app.post('/api/stack/create', function (request, response) {
		try {
			const validator = new Validator(request.body);
			const input = validator.validateCreateStack();
			console.log('Input : ', input);
			const stack = new Stack(input);
			stack.save((error, insertedStack) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: insertedStack._id }, response);
			});
		} catch (validationError) {
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});

	// delete stack
	app.delete('api/delete/stack/:stackId', function (request, response) {
		const stackId = request.params.stackId;
		Stack.remove({ _id: stackId }, (error, result) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
>>>>>>> upstream/master
			}
			return returnWithResponse.configureReturnData({ status: 200, success: true, result: `${stackId} was sucessfully deleted` },
				response);
		});
	});

	// user subscribing to an stack
	app.post('/api/subscribe', function (request, response) {
		try {
			const validator = new Validator(request.body);
			const input = validator.validateUserSubscribeStack();
			User.findOneAndUpdate({ userId: input.userId }, { $push: { subscribedStacks: input.stackName } }, (error, updatedResult) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: `${stackName} was sucessfully updated` },
					response);
			});
		} catch (validationError) {
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});

	// getting subscribed stacks for a user
	app.get('/api/stack/subscribed/:userId', function (request, response) {
		try {
			const validator = new Validator(request.params);
			const input = validator.validateGetUserSubscribeStack();
			User.findOne({ userId: input.userId }, (error, userDetails) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: userDetails.subscribedStacks }, response);
			});

		} catch (validationError) {
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});

	// create user and retruning created user id
	app.post('/api/newuser', function (request, response) {
		try {
			const validator = new Validator(request.body);
			const input = validator.validateCreateNewUser();
			const user = new User(input);
			user.save(function (error, insertedUser) {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: insertedUser._id }, response);
			});
		} catch (validationError) {
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});

	app.get('/api/notifications', function (request, response) { });

	app.get('/*', function (request, response) {
		response.sendFile('./public/404.html');
	});

}
