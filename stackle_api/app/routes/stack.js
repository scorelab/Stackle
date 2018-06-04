var express = require('express');
var router = express.Router();

const Model = require('../models/stack');

//create a Stack
	router.post('/create', function(request, response){
		Model.createStack(request, response);
	});

//get All stacks
	router.get('/all', function(request, response){
		Model.getAll(request, response);
	});	

//get stack by name
	router.get('/name/:organisationName', function(request, response){
		Model.getByName(request, response);
	});


// Get stack by id 
	router.get('/id/:stackId', function(request, response){
		Model.getById(request, response);
	});




//Only for developer Mode. Never consume below two APIs	

//clear all data
	router.delete('/all', function(request, response){
		Model.clearAll(request, response);
	});

// Delete stack by id 
	router.delete('/:stackId', function(request, response){
		Model.deleteById(request, response);
	});




module.exports = router;
