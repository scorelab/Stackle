const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');

// create user and retruning created user id
router.post('/create', function (request, response) {
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

// export
module.exports = router;