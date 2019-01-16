const passport = require('passport')
const returnWithResponse = require('../../lib/returnWithResponse');

const githubCallbackSuccess = (request, response) => {
  const { userId, token } = request.user
  const redirectUrl = `http://localhost:4200/callback?userId='${userId}&token=${token}`
  response.redirect(redirectUrl);
}

const githubCallbackFail = (err, request , response) => {
  returnWithResponse.configureReturnData({
    status: 400,
    success: false,
    result: 'Authentication Failed'
  }, response);
}

module.exports = {
  githubCallbackSuccess,
  githubCallbackFail
}