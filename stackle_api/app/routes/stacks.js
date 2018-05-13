const express = require('express');
const router = express.Router();
const Stack = require('../models/stack');
const User = require('../models/user');
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');

// get all stacks (organisation)
router.get('/', function (request, response) {
    Stack.find({}, (error, stacksDetails) => {
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
            result: stacksDetails
        }, response);
    });
});

// get a specific organisation
router.get('/:organisationName', function (request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateGetOrganisationDetails();
        Stack.find({
            name: input.organisationName
        }, (error, organisationDetails) => {
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

// create stack
router.post('/create', function (request, response) {
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
router.delete('/:stackId', function (request, response) {
    const stackId = request.params.stackId;
    Stack.remove({
        _id: stackId
    }, (error, result) => {
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
                result: `${stackId} was sucessfully deleted`
            },
            response);
    });
});

// YET TO IMPLEMENT
// user subscribing to an stack
router.post('/subscribe', function (request, response) {
    try {
        const validator = new Validator(request.body);
        const input = validator.validateUserSubscribeStack();
        console.log(input);
        User.findOneAndUpdate({
            userId: input.userId
        }, {
            $push: {
                
            }
        }, (error, updatedResult) => {
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
        console.log(validationError)
        return returnWithResponse.configureReturnData({
            status: 502,
            success: false,
            result: validationError
        }, response);
    }
});

// YET TO IMPLEMENT
// getting subscribed stacks for a user
router.get('/subscribed/:userId', function (request, response) {
    try {
        const validator = new Validator(request.params);
        const input = validator.validateGetUserSubscribeStack();
        User.findOne({
            userId: input.userId
        }, (error, userDetails) => {
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

// export
module.exports = router;