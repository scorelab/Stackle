var mongoose = require('mongoose');

var replySchema = mongoose.Schema({
    description: String,
    user: String,
    date: String
});

var commentSchema = mongoose.Schema({
    description: String,
    user: String,
    votes: Number,
    date: String,
    replies: [replySchema]
});

var postSchema = mongoose.Schema({
    title: String,
    description: String,
    org_name: String,
    tags: [],
    repository: String,
    link_issue: String,
    user: String,
    date: String,
    votes: Number,
    comments: [commentSchema]
});

var Post = mongoose.model('Post', postSchema);
var Comment = mongoose.model('Comment', commentSchema);
var Reply = mongoose.model('Reply', replySchema);

module.exports = {
    Post: Post,
    Comment: Comment,
    Reply: Reply
}