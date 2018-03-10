const mongoose = require('mongoose');

const stackSchema = mongoose.Schema({
    name: String,
    description: String,
    stackleUrl: String,
    githubUrl: String,
    createdUser: String
});

module.exports = mongoose.model('Stack', stackSchema);