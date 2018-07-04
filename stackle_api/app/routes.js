/** -------------------------  application -------------------------------- */
'use strict';
const mongoose = require('mongoose');

const User = require('./models/user');
const Stack = require('./models/stack');
const postModels = require('./models/post');
const Validator = require('./lib/validator').Validator;
const returnWithResponse = require('./lib/returnWithResponse');

const Post = postModels.Post;
const Comment = postModels.Comment;
const Reply = postModels.Reply;

module.exports = function (app, db) {

// Login  
	app.get('/login', function (request, response) {
		response.redirect('/auth/github');
	});

  
//needs to intergrate with github for implementation
    app.get('/home', function (request, response) {
        return returnWithResponse.configureReturnData({
            status: 501,
            success: false,
            result: 'Not Implemented'
        }, response);
    });


    // get a specific organisation
    app.get('/api/org/:organisationName', function (request, response) {
        try {
            const validator = new Validator(request.params);
            const input = validator.validateGetOrganisationDetails();
            Stack.find({name: input.organisationName}, (error, organisationDetails) => {
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
                    result: organisationDetails
                }, response);
            });
        } catch (validationError) {
            return returnWithResponse.configureReturnData({
                status: 502,
                success: false,
                result: validationError
            }, response);
        }
    });


    // get all stacks (organisation)
    app.get('/api/orgs', function (request, response) {
        Stack.find({}, (error, stacksDetails) => {
            if (error) {
                return returnWithResponse.configureReturnData({status: 400, success: false, result: error}, response);
            }

            return returnWithResponse.configureReturnData({
                status: 200,
                success: true,
                result: stacksDetails
            }, response);
        });
    });

    // create stack
    app.post('/api/stack/create', function (request, response) {
        try {
            const validator = new Validator(request.body);
            const input = validator.validateCreateStack();
            console.log('Input : ', input);
            const stack = new Stack(input);
            stack.save((error, insertedStack) => {
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
                    result: insertedStack._id
                }, response);
            });
        } catch (validationError) {
            return returnWithResponse.configureReturnData({
                status: 502,
                success: false,
                result: validationError
            }, response);
        }
    });

    // delete stack
    app.delete('api/delete/stack/:stackId', function (request, response) {
        const stackId = request.params.stackId;
        Stack.remove({_id: stackId}, (error, result) => {
            if (error) {
                return returnWithResponse.configureReturnData({status: 400, success: false, result: error}, response);
            }
            return returnWithResponse.configureReturnData({
                    status: 200,
                    success: true,
                    result: `${stackId} was sucessfully deleted`
                },
                response);
        });
    });

    // user subscribing to an stack
    app.post('/api/subscribe', function (request, response) {
        try {
            const validator = new Validator(request.body);
            const input = validator.validateUserSubscribeStack();
            User.findOneAndUpdate({userId: input.userId}, {$push: {subscribedStacks: input.stackName}}, (error, updatedResult) => {
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
                        result: `${stackName} was sucessfully updated`
                    },
                    response);
            });
        } catch (validationError) {
            return returnWithResponse.configureReturnData({
                status: 502,
                success: false,
                result: validationError
            }, response);
        }
    });

    // getting subscribed stacks for a user
    app.get('/api/stack/subscribed/:userId', function (request, response) {
        try {
            const validator = new Validator(request.params);
            const input = validator.validateGetUserSubscribeStack();
            User.findOne({userId: input.userId}, (error, userDetails) => {
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
                    result: userDetails.subscribedStacks
                }, response);
            });

        } catch (validationError) {
            return returnWithResponse.configureReturnData({
                status: 502,
                success: false,
                result: validationError
            }, response);
        }
    });

    // create user and retruning created user id
    app.post('/api/newuser', function (request, response) {
        try {
            const validator = new Validator(request.body);
            const input = validator.validateCreateNewUser();
            const user = new User(input);
            user.save(function (error, insertedUser) {
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
                    result: insertedUser._id
                }, response);
            });
        } catch (validationError) {
            return returnWithResponse.configureReturnData({
                status: 502,
                success: false,
                result: validationError
            }, response);
        }
    });

    app.get('/api/notifications', function (request, response) {
    });

    app.get('/*', function (request, response) {
        response.sendFile('./public/404.html');
    });


    //api
    //TODO later
    app.get('/api/login/', function (request, response) {
        return returnWithResponse.configureReturnData({
            status: 501,
            success: false,
            result: 'Not Implemented'
        }, response);
    });

    //needs to intergrate with github for implementation
    app.get('/home', function (request, response) {
        return returnWithResponse.configureReturnData({
            status: 501,
            success: false,
            result: 'Not Implemented'
        }, response);
    });

    app.get('/api/notifications', function (request, response) {
    });

    app.get('/*', function (request, response) {
        response.sendFile('./public/404.html');
    });
}
