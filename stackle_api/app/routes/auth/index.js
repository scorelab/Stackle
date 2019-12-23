const express = require('express')
const passport = require('passport')
const route = express.Router()
const authController = require('../../controllers/auth')

route.get('/github',
  passport.authenticate('github', {session: false})
);

route.get('/github/callback',
  passport.authenticate('github', {failureRedirect : '/', failWithError: true, session: false}),
  authController.githubCallbackSuccess,
  authController.githubCallbackFail
);

module.exports = route