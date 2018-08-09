/** -------------------------  application -------------------------------- */
'use strict';
const mongoose = require('mongoose');

const User = require('./models/user');
const Stack = require('./models/stack');
const postModels = require('./models/post');
const Validator = require('./lib/validator').Validator;
const returnWithResponse = require('./lib/returnWithResponse');

const Post = postModels.Post;
const Comment = postModels.Comment;
const Reply = postModels.Reply;

module.exports = function(app, db) {

    // Login  
    app.get('/login', function(request, response) {
        response.redirect('/auth/github');
    });

    //needs to intergrate with github for implementation
    app.get('/home', function(request, response) {
        return returnWithResponse.configureReturnData({
            status: 501,
            success: false,
            result: 'Not Implemented'
        }, response);
    });


    // app.get('/api/notifications', function (request, response) {
    // });

    app.get('/*', function(request, response) {
        response.sendFile('./public/404.html');
    });
}