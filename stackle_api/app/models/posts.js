var mongoose = require('mongoose');

var reply = mongoose.Schema({
	description : String,
	user : [user],
	date : String
});

var comment = mongoose.Schema({
	description : String,
	user : [user],
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
	user : [user],
	date : String,
	votes : Number,
	comments : [comment]
});