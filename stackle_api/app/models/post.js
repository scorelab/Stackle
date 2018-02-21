const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
    description: String,
    user: String,
    date: String
});

const commentSchema = mongoose.Schema({
    description: String,
    user: String,
    votes: Number,
    date: String,
    replies: [replySchema]
});

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    org_name: String,
    tags: [],
    repository: String,
    linkIssue: String,
    user: String,
    date: String,
    votes: Number,
    comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Reply = mongoose.model('Reply', replySchema);

module.exports = {
    Post,
    Comment,
    Reply
}