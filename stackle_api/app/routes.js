/** -------------------------  application -------------------------------- */
const mongoose = require('mongoose');
const Validator = require('./lib/validator').Validator;
const returnWithResponse = require('./lib/returnWithResponse');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

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


    app.use('/api', apiRouter);

    //Auth and its callback
    app.use('/auth', authRouter);
    

    //logout
    app.get('/logout' , function(request, response){
        UserModel.logout(request, response);
    });

    app.get('/*', function(request, response) {
        response.sendFile('./public/404.html');
    });
}