var express = require('express');
var router = express.Router();
const postModels = require('../models/post');

const Model = postModels.Post;

//to comment on a post
	router.post('/:postId', function (request, response) {
		Model.commentById(request, response);
	});

//to get all comment for a single post
	router.get('/all/:postId', function(request, response){
		Model.getAllComments(request, response);
	});

/*
TODO

	1. Increment Vote Count on comment
	2. Decrement VoteCount on comment
	3. Enpoints related to replies

*/
module.exports = router;
