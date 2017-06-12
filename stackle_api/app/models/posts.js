var mongoose = require('mongoose');

var reply = mongoose.Schema({
	description : String,
	user : String,
	date : String
});

var comment = mongoose.Schema({
	description : String,
	user : String,
	votes : Number,
	date : String,
	replies : [reply]
});


var post = mongoose.Schema({
	title : String,
	description : String,
	tags : [],
	repository : String,
	link_issue : String,
	user : String,
	date : String,
	votes : Number,
	comments : [comment]
});