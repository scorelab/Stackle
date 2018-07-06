var passport = require('passport');
var GithubStratergy = require('passport-github').Strategy;
var BearerStratergy = require('passport-http-bearer').Strategy;
var authConfig = require('../../config/auth');
const UserModel = require('../models/user');

//used by passport engine for serializing user
passport.serializeUser(function(user, done) {
    done(null, user);
});

//used by passport engine for de-serializing user
passport.deserializeUser(function(user, done) {
    done(null, user);
});


//Oauth strategy used by passportJS 
//TODO - change authConfig in production env
var strategy = new GithubStratergy({
        clientID: authConfig.clientId,
        clientSecret: authConfig.secret,
        callbackURL: authConfig.callback
    },
    function(token, refreshToken, profile, cb) {

        var user = profile;
        var data = user._json;
        var currentUser = {};

        currentUser.userId = user.username;
        currentUser.picUrl = data.avatar_url;
        currentUser.profileUrl = user.profileUrl;
        currentUser.token = token;

        if (data.email == null || !data.email)
            currentUser.email = 'N/A';
        else
            currentUser.email = data.email;

        if (user.displayName == null || !user.displayName || user.displayName === undefined)
            currentUser.name = currentUser.userId;
        else
            currentUser.name = user.displayName;

        // UserModel.findOrCreateUser(currentUser, cb);  

        UserModel.findOne({
            userId: currentUser.userId
        }).exec(function(err, data) {

            if (err) {
                cb(err, false);
            } else if (!data) {
                var temp = new UserModel(currentUser);
                temp.save();
                cb(null, temp);
            } else {
                data.token = token;
                data.save();
                cb(null, data);
            }

        });
    });

//Validating Token 
var strategyToken = new BearerStratergy(
    function(token, done) {
        UserModel.findOne({
                token: token
            },
            function(err, user) {
                if (err || !user) {
                    done(err, false);
                } else {
                    done(null, user);
                }

            }
        );
    }
);

passport.use(strategy);
passport.use(strategyToken);


module.exports = passport;