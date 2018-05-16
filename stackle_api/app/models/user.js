const mongoose = require('mongoose');
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');


const userSchema = mongoose.Schema({
    userId: String,
    github: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    gitlab: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    subscribedStacks: []
});

module.exports = mongoose.model('User', userSchema);