/** -------------------------  application -------------------------------- */
'use strict';
const mongoose = require('mongoose');

const User = require('./models/user');
const Stack = require('./models/stack');
const postModels = require('./models/post');
const returnWithResponse = require('./lib/returnWithResponse');

const Post = postModels.Post;
const Comment = postModels.Comment;
const Reply = postModels.Reply;

module.exports = function (app, db) {

	//api
	app.get('/api/login/', function (request, response) {
	})

	app.get('/home', function (request, response) {
		//needs to intergrate with github for implementation
		response.end();
	})

	//get all posts
	app.get('/api/posts', function (request, response) {
		Post.find({}, (error, postsDetails) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, result: postsDetails }, response);
		});
	});
	
	//save a post
	app.post('/api/user/post', function (request, response) {
		const post = new Post(request.body);
		post.save((error, insertedPost) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, result: insertedPost._id }, response);
		});
	})

	//get a post by id
	app.get('/api/post/:postid', function (request, response) {
		const  postId = request.params.postId;
		Post.findOne({ _id: postId }, (error, postDetails) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, result: postDetails }, response);
		});
	})

	//delete a post by ID
	app.delete('/api/post/:postid', function (request, response) {
		const postId = request.params.postId;
		Post.remove({ _id: postId }, (error, result) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}
			
		return returnWithResponse.configureReturnData({ status: 200, result: `${postId} was sucessfully deleted`}, response);
		});
	});

	//returns posts by a specific user
	app.get('/api/posts/:user', function (request, response) {
		const id = request.params.user;
		Post.find({ user: id }, (error, userPosts) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, result: userPosts }, response);
		});
	});

	//returns posts relating to specific organisation
	app.get('/api/posts/org/:org_name', function (request, response) {
		const organisationName = request.params.organisationName;
		Post.find({ org_name: organisationName }, (error, organisationPosts) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, result: organisationPosts }, response);
		});
	});

	// get a specific organisation
	app.get('/api/org/:orgname', function (request, response) {
		const organisationName = request.params.orgname;
		Stack.find({ name: organisationName }, (error, organisationDetails) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, result: organisationDetails }, response);
		});
	})

	// comment on a post
	app.post('/api/comment/:postid', function (request, response) {
		const query = {
			_id: request.params.postId,
		};
		const comment = new Comment(request.body);
		Post.update(query, { comments: [] }, (error, result) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, result: `${ request.params.postid} successfully updated`},
			response);
		});
	});

	// get all stacks (organisation)
	app.get('/api/orgs', function (request, response) {
		Stack.find({}, (error, stacksDetails) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, result: stacksDetails }, response);
		});
	});

	// create stack
	app.post('/api/stack/create', function (request, response) {
		const stack = new Stack(request.body);
		stack.save((error, insertedStack) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}
			
			return returnWithResponse.configureReturnData({ status: 200, result: insertedStack._id }, response);
		});
	});

	// delete stack
	app.delete('api/delete/stack/:stackid', function (request, response) {
		const stackId = request.params.stackId;
		Stack.remove({ _id: stackId }, (error, result) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}
			return returnWithResponse.configureReturnData({ status: 200, result: `${stackId} was sucessfully deleted` },
			response);
		});
	});

	// user subscribing to an stack
	app.post('/api/subscribe', function (request, response) {
		const stackName = request.body.stackName;
		const findQuery = {
			userId: request.body.uid,
		};
		User.findOneAndUpdate(findQuery, { $push: { subscribedStacks : stackName } }, (error, updatedResult) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}
			
			return returnWithResponse.configureReturnData({ status: 200,result: `${ stackName } was sucessfully updated`},
			response);
		});
	});

	// getting subscribed stacks for a user
	app.get('/api/stack/subscribed/:userid', function(request ,response) {
		User.findOne({ userId : request.params.userid }, (error, userDetails) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}
			
			return returnWithResponse.configureReturnData({ status: 200, result: userDetails.subscribedStacks }, response);
		});
	});

	// create user and retruning created user id
	app.post('/api/newuser', function (request, response) {
		const user = new User(request.body);
		user.save(function (error, insertedUser) {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, result: error }, response);
			}
			
			return returnWithResponse.configureReturnData({ status: 200, result: insertedUser._id }, response);
		});
	});

	app.get('/api/notifications', function (request, response) { });

	app.get('/*', function (request, response) {
		response.sendfile('./public/404.html');
	});

}
