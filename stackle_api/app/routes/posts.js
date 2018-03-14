const express = require('express');
const router = express.Router();
const postModels = require('../models/post');
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');

const Post = postModels.Post;
const Comment = postModels.Comment;
const Reply = postModels.Reply;

//get all posts
router.get('/', function (request, response) {
	Post.find({}, (error, postsDetails) => {
		if (error) {
			return returnWithResponse.configureReturnData({
				status: 400,
				success: false,
				result: error
			}, response);
		}

		return returnWithResponse.configureReturnData({
			status: 200,
			success: true,
			result: postsDetails
		}, response);
	});
});

//save a post
router.post('/add', function (request, response) {
	try {
		const validator = new Validator(request.body);
		const input = validator.validateAddingPost();
		const post = new Post(input);
		post.save((error, insertedPost) => {
			if (error) {
				return returnWithResponse.configureReturnData({
					status: 400,
					success: false,
					result: error
				}, response);
			}

			return returnWithResponse.configureReturnData({
				status: 200,
				success: true,
				result: insertedPost._id
			}, response);
		});
	} catch (validationError) {
		return returnWithResponse.configureReturnData({
			status: 502,
			success: false,
			result: validationError
		}, response);
	}
});

//get a post by id
router.get('/:postId', function (request, response) {
	try {
		const validator = new Validator(request.params);
		const input = validator.validateGetPost();
		Post.findOne({
			_id: input.postId
		}, (error, postDetails) => {
			if (error) {
				return returnWithResponse.configureReturnData({
					status: 400,
					success: false,
					result: error
				}, response);
			}

			return returnWithResponse.configureReturnData({
				status: 200,
				success: true,
				result: postDetails
			}, response);
		});
	} catch (validationError) {
		return returnWithResponse.configureReturnData({
			status: 502,
			success: false,
			result: validationError
		}, response);
	}
});

//delete a post by ID
router.delete('/:postId', function (request, response) {
	try {
		const validator = new Validator(request.params);
		const input = validator.validateDeletePost();
		Post.remove({
			_id: input.postId
		}, (error, result) => {
			if (error) {
				return returnWithResponse.configureReturnData({
					status: 400,
					success: false,
					result: error
				}, response);
			}

			return returnWithResponse.configureReturnData({
				status: 200,
				success: true,
				result: `${request.params.postId} was sucessfully deleted`
			}, response);
		});

	} catch (validationError) {
		return returnWithResponse.configureReturnData({
			status: 502,
			success: false,
			result: validationError
		}, response);
	}
});

//returns posts by a specific user
router.get('/user/:user', function (request, response) {
	try {
		const validator = new Validator(request.params);
		const input = validator.validatePostsByUser();
		console.log(input.user);
		Post.find({
			user: input.user
		}, (error, userPosts) => {
			if (error) {
				return returnWithResponse.configureReturnData({
					status: 400,
					success: false,
					result: error
				}, response);
			}

			return returnWithResponse.configureReturnData({
				status: 200,
				success: true,
				result: userPosts
			}, response);
		});
	} catch (validationError) {
		return returnWithResponse.configureReturnData({
			status: 502,
			success: false,
			result: validationError
		}, response);
	}
});

// returns posts relating to specific organisation
router.get('/org/:organisationName', function (request, response) {
	try {
		const validator = new Validator(request.params);
		const input = validator.validatePostToOrganisation();
		Post.find({
			org_name: input.organisationName
		}, (error, organisationPosts) => {
			if (error) {
				return returnWithResponse.configureReturnData({
					status: 400,
					success: false,
					result: error
				}, response);
			}

			return returnWithResponse.configureReturnData({
				status: 200,
				success: true,
				result: organisationPosts
			}, response);
		});
	} catch (validationError) {
		return returnWithResponse.configureReturnData({
			status: 502,
			success: false,
			result: validationError
		}, response);
	}
});

// comment on a post
router.post('/comment/:postId', function (request, response) {
	try {
		const validator = new Validator(request.params);
		const input = validator.validateCommentOnPost();
		const comment = new Comment(request.body);
		console.log(comment);
		Post.update({
			_id: input.postId
		}, {
			$push: {
				comments: comment
			}
		}, (error, result) => {
			if (error) {
				return returnWithResponse.configureReturnData({
					status: 400,
					success: false,
					result: error
				}, response);
			}

			return returnWithResponse.configureReturnData({
					status: 200,
					success: true,
					result: `${request.params.postId} successfully updated`
				},
				response);
		});
	} catch (validationError) {
		return returnWithResponse.configureReturnData({
			status: 502,
			success: false,
			result: validationError
		}, response);
	}
});

// export
module.exports = router;