var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
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
	},
	subscribed_stacks : []
});

module.exports = mongoose.model('User', userSchema);