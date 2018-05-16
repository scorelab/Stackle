var express = require('express');
var router = express.Router();
const postModels = require('../models/post');


const Post = postModels.Post;

//to get all posts
	router.get('/all', function (request, response) {
			Post.getAll(request, response);
		});

//to get a single post by id
	router.get('/:postId', function (request, response) {
		Post.getById(request, response);
	});
	
//to create a post	
	router.post('/create', function (request, response) {
		Post.setPost(request, response);
	});

//to get all posts by a specific user
	router.get('/all/user/:user', function (request, response) {
		Post.getAllByUser(request, response);
	});

//to get all posts relating to specific organisation
	router.get('/all/org/:organisationName', function (request, response) {
		Post.getAllByOrg(request, response);
	});	

//to delete a post by ID
	router.delete('/:postId', function (request, response) {
		Post.deleteById(request, response);
	});


/*
//todo post body is not validated in a validator

//to comment on a post
	router.post('/comment/:postId', function (request, response) {
		Post.commentById(request, response);
	});


*/

/*
	TODO 
	1. comment on post : post body is not validated in a validator
	2. Add increment count
	3. Add decrement count
	4. Add tag to post
	5. remove tag from post
	6. result error should be in string while throwing error

*/

module.exports = router;
