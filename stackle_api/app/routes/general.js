const express = require('express');
const router = express.Router();
const Validator = require('../lib/validator').Validator;
const returnWithResponse = require('../lib/returnWithResponse');

//needs to intergrate with github for implementation
router.get('/home', function (request, response) {
    return returnWithResponse.configureReturnData({ status: 501, success: false, result: 'Not Implemented' }, response);
});

router.get('/api/notifications', function (request, response) { });

router.get('/*', function (request, response) {
    response.sendFile('404.html',{ root : __dirname+'../../../public'});
});

// export
module.exports = router;