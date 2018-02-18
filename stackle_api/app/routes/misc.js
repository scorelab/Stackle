/**
 * Created by bhavyaagg on 18/02/18.
 */

// The routes present here has to be sorted into meaningful routes

const express = require('express');
const router = express.Router();

router.get('/home', function (req, res) {
    //needs to intergrate with github for implementation
    res.end();
})

router.get('/*', function (req, res) {
    res.sendfile('./public/404.html');
});

exports = module.exports = router;