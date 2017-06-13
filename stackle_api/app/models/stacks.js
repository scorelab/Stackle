var mongoose = require('mongoose');

var stack = mongoose.Schema({
	name : String,
	description : String,
	stackleUrl : String,
	githubUrl : String
});