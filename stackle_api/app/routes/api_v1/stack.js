/**
 * Created by bhavyaagg on 18/02/18.
 */

const express = require('express');
const router = express.Router();

const Stack = require('../../models/stack');
const User = require('../../models/user');

//create stack
router.post('/create', function (req, res) {
    let stack = new Stack(req.body);
    stack.save(function (err, stack) {
        if (err) {
            console.log("Error saving the stack to database");
            res.send("Error saving stack!");
        } else if (stack) {
            res.send("Sucessfully created the stack");
        } else {
            res.send("Null");
        }
    });
});

//getting subscribed stacks for a user
router.get('/subscribed/:userId', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    User.findOne({userId: req.params.userId}, function (err, result) {
        if (err) {
            res.send(err);
        } else if (result) {
            let subStack = result.subscribed_stacks;
            res.send(subStack);
        } else {
            res.send("Can't get!");
        }
    });
});


exports = module.exports = router;