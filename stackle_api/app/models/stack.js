var mongoose = require('mongoose');

var stackSchema = mongoose.Schema({
	name : String,
	description : String,
	stackleUrl : String,
	githubUrl : String
});

module.export = mongoose.model('Stack', stackSchema);