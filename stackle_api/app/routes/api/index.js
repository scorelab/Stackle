const express = require('express')
const passport = require('passport')
const route = express.Router()
const apiController = require('../../controllers/api')


route.use('/post', apiController.post);
route.use('/comment', apiController.comment);
route.use('/user', apiController.user);
route.use('/org', apiController.stack);
route.use('/reply', apiController.reply);
route.get('/profile',
  passport.authenticate('bearer', { session: false, failWithError: true }),
  apiController.profile.success,
  apiController.profile.failure 
);

  
module.exports = route