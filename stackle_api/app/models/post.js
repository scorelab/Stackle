const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
    description: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: String, required: true }
});

const commentSchema = mongoose.Schema({
    description: { type: String, required: true },
    user: { type: String, required: true },
    votes: Number,
    date: { type: String, required: true },
    replies: [replySchema]
});

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    org_name: { type: String, required: true },
    tags: [],
    repository: String,
    linkIssue: String,
    user: { type: String, required: true },
    date: { type: String, required: true },
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