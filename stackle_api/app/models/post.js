var mongoose = require('mongoose');

var replySchema = mongoose.Schema({
	description : String,
	user : String,
	date : String
});

var commentSchema = mongoose.Schema({
	description : String,
	user : String,
	votes : Number,
	date : String,
	replies : [replySchema]
});

var postSchema = mongoose.Schema({
	title : String,
	description : String,
	org_name : String,
	tags : [],
	repository : String,
	link_issue : String,
	user : String,
	date : String,
	votes : Number,
	comments : [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);