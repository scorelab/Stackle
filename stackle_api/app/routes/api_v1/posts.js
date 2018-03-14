/**
 * Created by bhavyaagg on 17/02/18.
 */

const express = require('express');
const router = express.Router();

const postModels = require('../../models/post');

const Post = postModels.Post;

//get all posts
router.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Post.find({}, function (err, posts) {
        if (err) {
            console.log("Cant get all posts!");
        }
        res.send(posts);
    });
});

//returns posts by a specific user
router.get('/:user', function (req, res) {
    let id = req.params.user;
    Post.find({user: id}, function (err, posts) {
        if (err) {
            console.log("Erorr getting posts");
        }
        res.send(posts);
    });
});

//returns posts relating to specific org
router.get('/org/:orgName', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let orgName = req.params.orgName;
    Post.find({org_name: orgName}, function (err, posts) {
        if (err) {
            console.log(`Error getting posts from $orgname`);
        } else {
            res.send(posts);
        }
    });
});

exports = module.exports = router;