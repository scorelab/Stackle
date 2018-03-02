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
				return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, success: true, result: postsDetails }, response);
		});
	});

	//save a post
	app.post('/api/user/post', function (request, response) {
		try {
			const validator = new Validator(request.body);
			const input = validator.validateAddingPost();
			const post = new Post(input);
			post.save((error, insertedPost) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: insertedPost._id }, response);
			});
		} catch (validationError) {
			console.error('Error : ', validationError);
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});

	//get a post by id
	app.get('/api/post/:postId', function (request, response) {
		try {
			const validator = new Validator(request.params);
			const input = validator.validateGetPost();
			Post.findOne({ _id: input.postId }, (error, postDetails) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: postDetails }, response);
			});
		} catch (validationError) {
			console.error('Error : ', validationError);
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});

	//delete a post by ID
	app.delete('/api/post/:postId', function (request, response) {
		try {
			const validator = new Validator(request.params);
			const input = validator.validateDeletePost();
			Post.remove({ _id: input.postId }, (error, result) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: `${postId} was sucessfully deleted` }, response);
			});

		} catch (validationError) {
			console.error('Error : ', validationError);
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});

	//returns posts by a specific user
	app.get('/api/posts/:user', function (request, response) {
		try {
			const validator = new Validator(request.params);
			const input = validator.validatePostsByUser();
			Post.find({ user: input.user }, (error, userPosts) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: userPosts }, response);
			});
		} catch (validationError) {
			console.error('Error : ', validationError);
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});

	// returns posts relating to specific organisation
	app.get('/api/posts/org/:organisationName', function (request, response) {
		try {
			const validator = new Validator(request.params);
			const input = validator.validatePostToOrganisation();
			Post.find({ org_name: input.organisationName }, (error, organisationPosts) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: organisationPosts }, response);
			});
		} catch (validationError) {
			console.error('Error : ', validationError);
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
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
			console.error('Error : ', validationError);
			return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
		}
	});

	// comment on a post
	app.post('/api/comment/:postId', function (request, response) {
		try {
			const validator = new Validator(request.params);
			const input = validator.validateCommentOnPost();
			const comment = new Comment(request.body);
			Post.update({ _id: input.postId }, { comments: [] }, (error, result) => {
				if (error) {
					return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
				}

				return returnWithResponse.configureReturnData({ status: 200, success: true, result: `${request.params.postId} successfully updated` },
					response);
			});
		} catch (validationError) {
			console.error('Error : ', validationError);
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
	});

	// create stack
	app.post('/api/stack/create', function (request, response) {
		const stack = new Stack(request.body);
		stack.save((error, insertedStack) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, success: true, result: insertedStack._id }, response);
		});
	});

	// delete stack
	app.delete('api/delete/stack/:stackId', function (request, response) {
		const stackId = request.params.stackId;
		Stack.remove({ _id: stackId }, (error, result) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
			}
			return returnWithResponse.configureReturnData({ status: 200, success: true, result: `${stackId} was sucessfully deleted` },
				response);
		});
	});

	// user subscribing to an stack
	app.post('/api/subscribe', function (request, response) {
		const stackName = request.body.stackName;
		const findQuery = {
			userId: request.body.uid,
		};
		User.findOneAndUpdate(findQuery, { $push: { subscribed_stacks: stackName } }, (error, updatedResult) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, success: true, result: `${stackName} was sucessfully updated` },
				response);
		});
	});

	// getting subscribed stacks for a user
	app.get('/api/stack/subscribed/:userId', function (request, response) {
		User.findOne({ userId: request.params.userId }, (error, userDetails) => {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, success: true, result: userDetails.subscribed_stacks }, response);
		});
	});

	// create user and retruning created user id
	app.post('/api/newuser', function (request, response) {
		const user = new User(request.body);
		user.save(function (error, insertedUser) {
			if (error) {
				return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
			}

			return returnWithResponse.configureReturnData({ status: 200, success: true, result: insertedUser._id }, response);
		});
	});

	app.get('/api/notifications', function (request, response) { });

	app.get('/*', function (request, response) {
		response.sendfile('./public/404.html');
	});

}
