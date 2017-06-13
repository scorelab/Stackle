var mongoose = require('mongoose');

var user = mongoose.Schema({
	userId : String,
	github : {
		id : String,
		token : String,
		email : String,
		name : String
	},
	gitlab : {
		id : String,
		token : String,
		email : String,
		name : String
	}
});