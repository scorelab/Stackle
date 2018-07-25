var express = require('express');
var router = express.Router();
const models = require('../models/post');
const Reply = models.Reply;

//to reply on a comment
	router.post('/:commentId', function (request, response) {
		Reply.replyById(request, response);
	});

//to get all replies for a single comment
	router.get('/all/:commentId', function(request, response){
		Reply.getAll(request, response);
	});

//to clear all replies - (only for developer mode)
	router.delete('/all', function(request, response){
		Reply.deleteAll(request, response);
	});

//to get reply by Id
	router.get('/:replyId', function(request, response){
		Reply.getReplyById(request, response);
	});

module.exports = router;
