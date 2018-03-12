const mongoose = require('mongoose');

const stackSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    stackleUrl: { type: String, required: true },
    githubUrl: String,
    createdUser: { type: String, required: true }
});

module.exports = mongoose.model('Stack', stackSchema);