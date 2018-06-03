const mongoose = require('mongoose');
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');


const stackSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    stackleUrl: { type: String, required: true },
    githubUrl: String,
    createdUser: { type: String, required: true }
});

module.exports = mongoose.model('Stack', stackSchema);