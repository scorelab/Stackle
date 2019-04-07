const mongoose = require('mongoose');
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');
const User = require('./user');


const replySchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const commentSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User3'
    }],
});

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    org_name: {
        type: String,
        required: true
    },
    tags: [],
    repository: String,
    linkIssue: String,
    user: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User3'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

//CRUD operations for POST schema

//CREATE - save a post
postSchema.statics.setPost = function(request, response) {
    try {
        const validator = new Validator(request.body);
        const input = validator.validateAddingPost();
        const post = new Post(input);
        post.save((error, insertedPost) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: insertedPost._id
            }, response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//READ - get all posts
postSchema.statics.getAll = function(request, response) {

    this.find({}).populate({
        path: 'comments',
        model: 'Comment',
        populate: {
            path: 'replies',
            model: 'Reply'
        }
    }).populate({
        path: 'comments',
        model: 'Comment',
        populate: {
            path: 'likes',
            model: 'User3'
        }
    }).populate('likes').exec((error, postsDetails) => {
        if (error) {
            return returnWithResponse.configureReturnData({
                status: 400,
                success: false,
                result: error
            }, response);
        }
        return returnWithResponse.configureReturnData({
            status: 200,
            success: true,
            result: postsDetails
        }, response);
    });
}

//READ - get post by id 
postSchema.statics.getById = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateGetPost();

        this.findOne({
            _id: input.postId
        }).populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'replies',
                model: 'Reply'
            }
        }).populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'likes',
                model: 'User3'
            }
        }).populate('likes').exec((error, postDetails) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!postDetails)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Post: ${input.postId} not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: postDetails
            }, response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//READ - get all posts by user
postSchema.statics.getAllByUser = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validatePostsByUser();
        this.find({
            user: input.user
        }).populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'replies',
                model: 'Reply'
            }
        }).populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'likes',
                model: 'User3'
            }
        }).populate('likes').exec((error, userPosts) => {

            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!userPosts || userPosts.length === 0)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Posts by ${input.user} user not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: userPosts
            }, response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//READ - get all posts by organisationName
postSchema.statics.getAllByOrg = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validatePostToOrganisation();
        this.find({
            org_name: input.organisationName
        }).populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'replies',
                model: 'Reply'
            }
        }).populate('likes').populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'likes',
                model: 'User3'
            }
        }).exec((error, organisationPosts) => {

            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!organisationPosts || organisationPosts.length === 0)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Posts by ${input.organisationName} organisation not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: organisationPosts
            }, response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//Comment on a post
postSchema.statics.commentById = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const bodyValidator = new Validator(request.body);
        const input = validator.validateCommentOnPost();
        const inputComment = bodyValidator.validateCommentBody();
        var comment = new Comment(inputComment);
        comment.save(function(err, data) {
            if (err)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
        });

        Post.findOneAndUpdate({
            _id: input.postId
        }, {
            $push: {
                comments: comment._id
            }
        }, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Post-${input.postId} not found`
                }, response);

            return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: comment
                },
                response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//get All comments for a single post
postSchema.statics.getAllComments = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateCommentOnPost();

        Post.findOne({
            _id: input.postId
        }).populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'replies',
                model: 'Reply'
            }
        }).populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'likes',
                model: 'User3'
            }
        }).exec((error, result) => {

            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Post-${input.postId} not found`
                }, response);


            return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: result.comments
                },
                response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//to increment vote up on Post
postSchema.statics.getLikes = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validatePostId();

        Post.findOne({
            _id: input.postId
        }).populate('likes').exec((err, result) => {
            if (err) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: err
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Post-${input.postId} not found`
                }, response);

            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: result.likes
            }, response);
        });


    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//ADD tag to post
postSchema.statics.addTag = function(request, response) {
    try {
        const validatorPostId = new Validator(request.params);
        const input = validatorPostId.validatePostId();
        var currentId = input.postId;

        const validatorTag = new Validator(request.body);
        const input2 = validatorTag.validateAddTag();
        var currentTag = input2.tag;

        Post.findOne({
            _id: currentId
        }, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Post-${input.postId} not found`
                }, response);


            var tagData = result.tags;
            var check = tagData.indexOf(currentTag);
            if (check === -1) {
                result.tags.push(currentTag);
                result.save();
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: `${currentTag} added to post ${currentId}`
                }, response);
            } else {
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: false,
                    result: `Post: ${currentId} is already tagged with ${currentTag}`
                }, response);
            }

        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//to remove tag from post
postSchema.statics.removeTag = function(request, response) {
    try {
        const validatorPostId = new Validator(request.params);
        const input = validatorPostId.validatePostId();
        var currentId = input.postId;

        const validatorTag = new Validator(request.body);
        const input2 = validatorTag.validateAddTag();
        var currentTag = input2.tag;

        Post.findOne({
            _id: currentId
        }, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Post: ${currentId} not found`
                }, response);

            var tagData = result.tags;
            var check = tagData.indexOf(currentTag);
            if (check === -1) {
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: false,
                    result: `${currentTag} is not found in post: ${currentId}`
                }, response);
            } else {
                tagData.splice(check, 1);
                result.save();
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: `${currentTag} tag is removed from the post : ${currentId}`
                }, response);
            }

        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//POST- like the post
postSchema.statics.setLikeUp = function(request, response) {

    try {
        //Valdiating postId in req.params
        const validatorPostId = new Validator(request.params);
        const input1 = validatorPostId.validatePostId();
        const currentPostId = input1.postId;

        //Valdiating userId in req.body   
        const validatorUserId = new Validator(request.body);
        const input2 = validatorUserId.validateUserId();
        const currentUserId = input2.userId;

        this.findOne({
            _id: currentPostId
        }, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Post-${currentPostId} not found`
                }, response);

            var likeArray = result.likes;
            var check = likeArray.indexOf(currentUserId);

            if (check === -1) {
                 // result.likes.push(currentUserId)
                // here instead of pushing currentuserID which you are sending github username in string we have to push 
                // object id of that user from user schema that is why server carshes because you are pushing string to array
                // of mongoose.Schema.Types.ObjectId
                result.likes.push(mongoose.Types.ObjectId(currentUserId));
                result.save(function(err) {
                    if (err)
                        return returnWithResponse.configureReturnData({
                            status: 400,
                            success: false,
                            result: 'Internal Database error'
                        }, response);

                    else {
                        User.findOne({
                            _id: currentUserId
                        }).exec(function(err, data) {
                            if (err || !data)
                                return returnWithResponse.configureReturnData({
                                    status: 400,
                                    success: false,
                                    result: 'Invalid User Id'
                                }, response);

                            data.postLikes.push(currentPostId);
                            data.save();
                            return returnWithResponse.configureReturnData({
                                status: 200,
                                success: true,
                                result: `${currentUserId}: user liked the post-${currentPostId}`
                            }, response);
                        });
                    }

                });
            } else {
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: false,
                    result: `User already liked the post - ${currentPostId}`
                }, response);
            }
        });

    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }

}


//POST- Dislike the post
postSchema.statics.setLikeDown = function(request, response) {
    try {
        //Valdiating postId in req.params
        const validatorPostId = new Validator(request.params);
        const input1 = validatorPostId.validatePostId();
        const currentPostId = input1.postId;

        //Valdiating userId in req.body   
        const validatorUserId = new Validator(request.body);
        const input2 = validatorUserId.validateUserId();
        const currentUserId = input2.userId;

        this.findOne({
            _id: currentPostId
        }, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Post-${currentPostId} not found`
                }, response);

            var likeArray = result.likes;
            var check = likeArray.indexOf(currentUserId);

            if (check === -1) {
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: false,
                    result: `${currentUserId}-user not found in the likes of the post-${currentPostId}`
                }, response);
            } else {

                result.likes.splice(check, 1);
                result.save(function(err) {
                    if (err)
                        return returnWithResponse.configureReturnData({
                            status: 400,
                            success: false,
                            result: 'Internal Database error'
                        }, response);

                    else {

                        User.findOne({
                            _id: currentUserId
                        }).exec(function(err, data) {
                            if (err || !data)
                                return returnWithResponse.configureReturnData({
                                    status: 400,
                                    success: false,
                                    result: 'Invalid User Id'
                                }, response);

                            var postIndex = data.postLikes.indexOf(currentPostId);
                            data.postLikes.splice(postIndex, 1);
                            data.save();
                            return returnWithResponse.configureReturnData({
                                status: 200,
                                success: true,
                                result: `User Disliked the post - ${currentPostId}`
                            }, response);
                        });

                    }

                });
            }

        });

    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//DELETE - delete post by id
postSchema.statics.deleteById = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateDeletePost();
        var currentId = input.postId;

        this.deleteOne({
            _id: currentId
        }, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Post-${input.postId} not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: `${currentId} was sucessfully deleted`
            }, response);
        });

    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//to delete all post
postSchema.statics.deleteAll = function(request, response) {
    this.remove({}, function(err) {
        if (err)
            return returnWithResponse.configureReturnData({
                status: 400,
                success: false,
                result: err
            }, response);


        return returnWithResponse.configureReturnData({
            status: 200,
            success: true,
            result: `All data removed.`
        }, response);

    });
}

//get comment by id
commentSchema.statics.getCommentById = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateCommentId();
        this.findOne({
            _id: input.commentId
        }).populate('likes').exec((error, commentData) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!commentData)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Comment: ${input.commentId} not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: commentData
            }, response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

//to add user to like in comment

commentSchema.statics.setLikeUpComment = function(request, response) {

    try {
        //Valdiating commentId in req.params
        const validatorCommentId = new Validator(request.params);
        const input1 = validatorCommentId.validateCommentId();
        const currentCommentId = input1.commentId;

        //Valdiating userId in req.body   
        const validatorUserId = new Validator(request.body);
        const input2 = validatorUserId.validateUserId();
        const currentUserId = input2.userId;

        this.findOne({
            _id: currentCommentId
        }, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Comment-${currentCommentId} not found`
                }, response);

            var likeArray = result.likes;
            var check = likeArray.indexOf(currentUserId);

            if (check === -1) {
                result.likes.push(currentUserId);
                result.save();
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: `${currentUserId}: user liked the comment-${currentCommentId}`
                }, response);
            } else {
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: false,
                    result: `User already liked the comment - ${currentCommentId}`
                }, response);
            }
        });

    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }

}


//to remove user from like in comment

commentSchema.statics.setLikeDownComment = function(request, response) {

    try {
        //Valdiating commentId in req.params
        const validatorCommentId = new Validator(request.params);
        const input1 = validatorCommentId.validateCommentId();
        const currentCommentId = input1.commentId;

        //Valdiating userId in req.body   
        const validatorUserId = new Validator(request.body);
        const input2 = validatorUserId.validateUserId();
        const currentUserId = input2.userId;

        this.findOne({
            _id: currentCommentId
        }, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Comment-${currentCommentId} not found`
                }, response);

            var likeArray = result.likes;
            var check = likeArray.indexOf(currentUserId);

            if (check === -1) {
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: false,
                    result: `${currentUserId}-user not found in the likes of the Comment-${currentCommentId}`
                }, response);
            } else {

                result.likes.splice(check, 1);
                result.save();
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: `User Disliked the Comment - ${currentCommentId}`
                }, response);
            }

        });

    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

commentSchema.statics.getLikes = function(request, response) {

    try {
        //Valdiating commentId in req.params
        const validatorCommentId = new Validator(request.params);
        const input1 = validatorCommentId.validateCommentId();
        const currentCommentId = input1.commentId;

        this.findOne({
            _id: currentCommentId
        }).populate('likes').exec((error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Comment-${currentCommentId} not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: result.likes
            }, response);

        });

    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}


//to delete all comments
commentSchema.statics.deleteAll = function(request, response) {
    this.remove({}, function(err) {
        if (err)
            return returnWithResponse.configureReturnData({
                status: 400,
                success: false,
                result: err
            }, response);


        return returnWithResponse.configureReturnData({
            status: 200,
            success: true,
            result: `All Comment data removed.`
        }, response);

    });
}

// to get All the comments for a specific user
commentSchema.statics.getAllCommentsByUser = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateCommentsByUser();
        this.find({
            user: input.user
        }).populate('likes').populate('replies').exec((error, data) => {

            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!data || data.length === 0)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Comments by ${input.user} user not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: data
            }, response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}



// Reply create

replySchema.statics.replyById = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const bodyValidator = new Validator(request.body);

        const input = validator.validateCommentId();
        const inputComment = bodyValidator.validateReplyBody();

        var reply = new Reply(inputComment);
        reply.save(function(err, data) {
            if (err)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
        });

        Comment.findOneAndUpdate({
            _id: input.commentId
        }, {
            $push: {
                replies: reply._id
            }
        }, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Comment-${input.commentId} not found`
                }, response);

            return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: reply
                },
                response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}

// to get all replies for a single comment

replySchema.statics.getAll = function(request, response) {

    try {
        const validator = new Validator(request.params);
        const input = validator.validateCommentId();

        Comment.findOne({
            _id: input.commentId
        }).populate('replies').exec((error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!result)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Comment-${input.postId} not found`
                }, response);


            return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: result.replies
                },
                response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}


//get reply by id
replySchema.statics.getReplyById = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateReplyId();
        this.findOne({
            _id: input.replyId
        }, (error, data) => {
            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!data)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Reply: ${input.replyId} not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: data
            }, response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}


// to get All the replies for a specific user
replySchema.statics.getAllRepliesByUser = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateRepliesByUser();

        this.find({
            user: input.user
        }).exec((error, data) => {

            if (error) {
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: error
                }, response);
            }

            if (!data || data.length === 0)
                return returnWithResponse.configureReturnData({
                    status: 400,
                    success: false,
                    result: `Replies by ${input.user} user not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: data
            }, response);
        });
    } catch (validationError) {
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError.toString()
        }, response);
    }
}


//to clear all - only for developer use
replySchema.statics.deleteAll = function(request, response) {
    this.remove({}, function(err) {
        if (err)
            return returnWithResponse.configureReturnData({
                status: 400,
                success: false,
                result: err
            }, response);


        return returnWithResponse.configureReturnData({
            status: 200,
            success: true,
            result: `All replies data removed.`
        }, response);

    });
}

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Reply = mongoose.model('Reply', replySchema);

module.exports = {
    Post,
    Comment,
    Reply
}