var express = require('express');
var router = express.Router();
const postModels = require('../models/post');

const Model = postModels.Post;
const Comment = postModels.Comment;

//to comment on a post
	router.post('/:postId', function (request, response) {
		Model.commentById(request, response);
	});

//to get all comment for a single post
	router.get('/all/:postId', function(request, response){
		Model.getAllComments(request, response);
	});

//to clear all comment - (only for developer mode)
	router.delete('/all', function(request, response){
		Comment.deleteAll(request, response);
	});

//to get Comment by Id
	router.get('/:commentId', function(request, response){
		Comment.getCommentById(request, response);
	});

//to increment vote count in comment
	router.post('/vote/up/:commentId', function(request, response){
		Comment.setVoteUp(request, response);
	});

//to decrement vote count in comment
	router.post('/vote/down/:commentId', function(request, response){
		Comment.setVoteDown(request, response);
	});


/*
	3. Enpoints related to replies
*/
module.exports = router;
