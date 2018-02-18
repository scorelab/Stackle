/**
 * Created by bhavyaagg on 17/02/18.
 */
const express = require('express');
const router = express.Router();

const postModels = require('../../models/post')

const Post = postModels.Post;

//save a post
router.post('/post', function (req, res) {
    let post = new Post(req.body);
    post.save(function (err, post) {
        if (err) {
            console.log("error saving the post");
            res.send("error!")
        } else {
            res.send("Sucessfully saved the post!");
        }
    });
})

exports = module.exports = router;