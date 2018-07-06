const returnWithResponse = require('./returnWithResponse');

//check authorization to protected resource 
const auth = function(request, response, next) {
    if (request.isAuthenticated())
        return next();
    else
        returnWithResponse.configureReturnData({
            status: 401,
            success: false,
            result: 'Access-Denied ! You are not authorized to access this URL.'
        }, response);
}

module.exports = auth;