/**
 * Created by bhavyaagg on 18/02/18.
 */

const express = require('express');
const router = express.Router();

const Stack = require('../../models/stack');

//get a specific org
router.get('/:orgname', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let orgname = req.params.orgname;
    Stack.find({name: orgname}, function (err, org) {
        if (err) {
            console.log('Error');
        } else {
            res.send(org);
        }
    })
})

exports = module.exports = router;