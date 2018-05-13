const express = require('express');
const router = express.Router();
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');

//api
router.get('/login', function (request, response) {
    return returnWithResponse.configureReturnData({ status: 501, success: false, result: 'Not Implemented' }, response);
});