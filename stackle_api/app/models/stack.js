var mongoose = require('mongoose');

var stackSchema = mongoose.Schema({
	name : String,
	description : String,
	stackleUrl : String,
	githubUrl : String,
	created_user : String
});

module.exports = mongoose.model('Stack', stackSchema);