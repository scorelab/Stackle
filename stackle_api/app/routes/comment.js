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

//to get like array of users 
  router.get('/likes/:commentId', function(request, response){ 
    Comment.getLikes(request, response); 
  });   
 
//to like a comment 
  router.post('/likes/up/:commentId', function(request, response){ 
    Comment.setLikeUpComment(request, response); 
  });   
 
//to dislike the liked comment 
  router.post('/likes/down/:commentId', function(request, response){ 
    Comment.setLikeDownComment(request, response); 
  });   

//to get comment by user
	router.get('/all/user/:user', function(request, response){
		Comment.getAllCommentsByUser(request, response);
	});	

module.exports = router;
