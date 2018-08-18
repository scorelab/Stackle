const mongoose = require('mongoose');
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');


const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        unique: false
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picUrl: {
        type: String,
        required: false
    },
    profileUrl: {
        type: String,
        required: false
    },
    postLikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    subscribedStacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stack'
    }]
});

// create a user
userSchema.statics.createUser = function(request, response) {
    try {
        const validator = new Validator(request.body);
        const input = validator.validateCreateNewUser();
        const user = new User(input);
        user.save(function(error, insertedUser) {
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
                result: `${insertedUser.userId} user created`
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

//get All user
userSchema.statics.getAll = function(request, response) {
    this.find({}).populate('subscribedStacks').exec((error, data) => {
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
            result: data
        }, response);
    });
}

//get User by username
userSchema.statics.getById = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateUserId();
        this.findOne({
            userId: input.userId
        }).populate('subscribedStacks').exec((error, data) => {
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
                    result: `User: ${input.userId} not found`
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

//get user by db id
userSchema.statics.getByDBId = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateUserId();

        this.findOne({
            _id: input.userId
        }).populate('subscribedStacks').exec((error, data) => {
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
                    result: `User: ${input.userId} not found`
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




userSchema.statics.getStacks = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateUserId();
        this.findOne({
            userId: input.userId
        }).populate('subscribedStacks').exec((error, data) => {
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
                    result: `User: ${input.userId} not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: data.subscribedStacks
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

//subscribe stack
userSchema.statics.subscribe = function(request, response) {
    try {
        const validator = new Validator(request.body);
        const input = validator.validateUserSubscribeStack();


        this.findOne({
            userId: input.userId
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
                    result: `User: ${input.userId} not found`
                }, response);

            var stacks = result.subscribedStacks;
            var check = stacks.indexOf(input.stackId);
            if (check === -1) {
                result.subscribedStacks.push(input.stackId);
                result.save();
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: `user ${input.userId} subscribed to stack : ${input.stackId} `
                }, response);
            } else {
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: false,
                    result: `user ${input.userId} Already subscribed to stack : ${input.stackId} `
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

//unsubscribe the user from stack
userSchema.statics.unsubscribe = function(request, response) {
    try {
        const validator = new Validator(request.body);
        //validating userId and stackId in body
        const input = validator.validateUserSubscribeStack();

        this.findOne({
            userId: input.userId
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
                    result: `User: ${input.userId} not found`
                }, response);

            var stacks = result.subscribedStacks;
            var check = stacks.indexOf(input.stackId);
            if (check === -1) {
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: false,
                    result: `user ${input.userId} is not subscribed to stack : ${input.stackId} `
                }, response);
            } else {

                stacks.splice(check, 1);
                result.save();
                return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: `user ${input.userId} Unsubscribed to stack : ${input.stackId} `
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

//delete all user
userSchema.statics.clearAll = function(request, response) {
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
            result: `All User data removed.`
        }, response);

    });
}

//find or create user
userSchema.statics.findOrCreateUser = function(user, cb) {
    this.findOne({
        userId: currentUser.userId
    }).exec(function(err, data) {

        if (err) {
            cb(err, false);
        } else if (!data) {
            var temp = new UserModel(currentUser);
            temp.save();
            cb(null, temp);
        } else {
            data.token = token;
            data.save();
            cb(null, data);
        }

    });
}


//LogoutHelper function
userSchema.statics.logout = function(request, response) {
    this.findOne({
        token: request.query.access_token
    }).exec(function(err, data) {
        if (err || !data) {
            return returnWithResponse.configureReturnData({
                status: 400,
                success: false,
                result: 'Logout Failed! Access Denied.'
            }, response);
        } else {
            data.token = ' ';
            data.save();
            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: 'User SuccessFully Logout'
            }, response);
        }

    });
}


//to get post likes for a user
userSchema.statics.getpostLikes = function(request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateUserId();

        this.findOne({
            _id: input.userId
        }).exec((error, data) => {
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
                    result: `User: ${input.userId} not found`
                }, response);


            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: data.postLikes
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

const User = mongoose.model('User3', userSchema);
module.exports = User;