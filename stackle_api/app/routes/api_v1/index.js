/**
 * Created by bhavyaagg on 17/02/18.
 */

const express = require('express');
const router = express.Router();

router.use('/org', require('./org'));
router.use('/orgs', require('./orgs'));
router.use('/post', require('./post'));
router.use('/posts', require('./posts'));
router.use('/stack', require('./stack'));
router.use('/user', require('./user'));

router.use('/', require('./misc'));

exports = module.exports = router;