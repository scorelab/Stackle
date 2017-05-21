var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
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