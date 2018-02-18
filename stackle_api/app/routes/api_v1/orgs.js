/**
 * Created by bhavyaagg on 18/02/18.
 */

const express = require('express');
const router = express.Router();

const Stack = require('../../models/stack');

//get all stacks (orgs)
router.get('/', function (req, res) {
    Stack.find({}, function (err, stacks) {
        if (err)
            console.log("Errors retrieving stacks!");
        else
            res.send(stacks);
    })
})

exports = module.exports = router;