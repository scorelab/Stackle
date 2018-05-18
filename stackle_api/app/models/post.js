const mongoose = require('mongoose');
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');


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

//CRUD operations for POST schema

//CREATE - save a post
postSchema.statics.setPost = function(request, response){
    try {
            const validator = new Validator(request.body);
            const input = validator.validateAddingPost();
            const post = new Post(input);
            post.save((error, insertedPost) => {
                if (error) {
                    return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
                }

                return returnWithResponse.configureReturnData({ status: 200, success: true, result: insertedPost._id }, response);
            });
        } catch (validationError) {
            return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
        }
}

//READ - get all posts
postSchema.statics.getAll = function(request, response){
    this.find({}, (error, postsDetails) => {
            if (error) {
                return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
            }

            return returnWithResponse.configureReturnData({ status: 200, success: true, result: postsDetails }, response);
        });
}

//READ - get post by id 
postSchema.statics.getById = function(request, response){
    try {
            const validator = new Validator(request.params);
            const input = validator.validateGetPost();
            this.findOne({ _id: input.postId }, (error, postDetails) => {
                if (error) {
                    return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
                }

                return returnWithResponse.configureReturnData({ status: 200, success: true, result: postDetails }, response);
            });
        } catch (validationError) {
            return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
        }
}

//READ - get all posts by user
postSchema.statics.getAllByUser = function(request, response){
    try {
            const validator = new Validator(request.params);
            const input = validator.validatePostsByUser();
            this.find({ user: input.user }, (error, userPosts) => {
                if (error) {
                    return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
                }

                return returnWithResponse.configureReturnData({ status: 200, success: true, result: userPosts }, response);
            });
        } catch (validationError) {
            return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
        }
}

//READ - get all posts by organisationName
postSchema.statics.getAllByOrg = function(request, response){
    try {
            const validator = new Validator(request.params);
            const input = validator.validatePostToOrganisation();
            this.find({ org_name: input.organisationName }, (error, organisationPosts) => {
                if (error) {
                    return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
                }

                return returnWithResponse.configureReturnData({ status: 200, success: true, result: organisationPosts }, response);
            });
        } catch (validationError) {
            return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
        }
}


//Comment on a post
postSchema.statics.commentById = function(request, response){
        try {
            const validator = new Validator(request.params);
            const input = validator.validateCommentOnPost();
            const comment = new Comment(request.body);
            Post.update({ _id: input.postId }, { comments: [] }, (error, result) => {
                if (error) {
                    return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
                }

                return returnWithResponse.configureReturnData({ status: 200, success: true, result: `${request.params.postId} successfully updated` },
                    response);
            });
        } catch (validationError) {
            return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
        }
}


//DELETE - delete post by id
postSchema.statics.deleteById = function(request, response){
    try {
            const validator = new Validator(request.params);
            const input = validator.validateDeletePost();
            var currentId = input.postId;

            this.deleteOne({ _id: currentId }, (error, result) => {
                if (error) {
                    return returnWithResponse.configureReturnData({ status: 400, success: false, result: error }, response);
                }

                return returnWithResponse.configureReturnData({ status: 200, success: true, result: `${currentId} was sucessfully deleted` }, response);
            });

         } catch (validationError) {
            return returnWithResponse.configureReturnData({ status: 502, success: false, result: validationError }, response);
        }
}


const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Reply = mongoose.model('Reply', replySchema);

module.exports = {
    Post,
    Comment,
    Reply
}