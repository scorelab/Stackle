var express = require('express');
var router = express.Router();
const userModel = require('../models/user');

//create a user
	router.post('/create', function(request, response){
		userModel.createUser(request, response);
	});

//get All users
	router.get('/all', function(request, response){
		userModel.getAll(request, response);
	});	

//get current user
	router.get('/:userId', function(request, response){
		userModel.getById(request, response);
	});

//get current user by DB ID
	router.get('/id/:userId', function(request, response){
		userModel.getByDBId(request, response);
	});


//get list of subscribed stacks
	router.get('/stacks/:userId', function(request,response){
		userModel.getStacks(request, response);
	});

//subscribe a stack
	router.post('/subscribe', function(request, response){
		userModel.subscribe(request, response);
	});

//unsubscribe a stack
	router.post('/unsubscribe', function(request, response){
		userModel.unsubscribe(request, response);
	});

// get likes post by user
	router.get('/likes/post/:userId', function(request, response){
		userModel.getpostLikes(request, response);
	});

// only for developer mode dont consume below APIs

//clear all data
	router.delete('/all', function(request, response){
		userModel.clearAll(request, response);
	});

module.exports = router;
