/**
 * Created by bhavyaagg on 18/02/18.
 */


// The routes present here has to be sorted into meaningful routes

const express = require('express');
const router = express.Router();

const postModels = require('../../models/post');
const Stack = require('../../models/stack');
const User = require('../../models/user');

const Post = postModels.Post;
const Comment = postModels.Comment;

//api
router.get('/login', function (req, res) {
});

//comment on a post
router.post('/comment/:postid', function (req, res) {
    let postid = req.params.postid;
    let query = {_id: postid};
    let comment = new Comment(req.body);
    Post.update(query, {comments: []});
});



//delete stack
router.delete('/delete/stack/:stackid', function (req, res) {
    let stackId = req.params.stackid;
    Stack.remove({_id: stackId}, function (err, success) {
        if (err) {
            res.send("Couldn't delete Stack");
        } else {
            res.send("Stack Deleted");
        }
    });
});

//user subscribing to an stack
router.post('/subscribe', function (req, res) {
    let userid = req.body.uid;
    let stackname = req.body.stack_name;
    let query = {userId: userid};
    User.findOneAndUpdate(query, {$push: {subscribed_stacks: stackname}}, function (err, noaffected) {
        if (err) {
            res.send("Error Updating");
        } else {
            res.send("Success!!");
        }
    });
});



//create user
router.post('/newuser', function (req, res) {
    let user = new User(req.body);
    user.save(function (err, user) {
        if (err) {
            console.log("Error saving the stack to database");
            res.send("Error saving user!");
        } else {
            res.send("Sucessfully created the user");
        }
    });
});

router.get('/notifications', function (req, res) {
});


exports = module.exports = router;