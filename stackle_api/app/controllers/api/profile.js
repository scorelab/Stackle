const returnWithResponse = require('../../lib/returnWithResponse');

const success = (req, res, next) => {
    returnWithResponse.configureReturnData({
        status: 200,
        success: true,
        result: req.user
    } ,res);   
}

const failure = (err, req ,res, next) => {
    returnWithResponse.configureReturnData({
        status: 400,
        success: false,
        result: 'Access-Denied!'
    } ,res);
}

module.exports = {
    success,
    failure
}