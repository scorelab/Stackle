/**
 * Created by bhavyaagg on 17/02/18.
 */
const express = require('express');
const router = express.Router();

const postModels = require('../../models/post')

const Post = postModels.Post;

//get a post by id
router.get('/:postid', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let objectid = req.params.postid;
    Post.findOne({_id: objectid}, function (err, post) {
        if (err) {
            res.send(err)
        } else {
            res.send(post);
        }
    })
})

//delete a post by ID
router.delete('/api/post/:postid', function (req, res) {
    let postid = req.params.postid;
    Post.remove({_id: postid}, function (err, success) {
        if (err) {
            console.log(err);
            res.send("Error deleting the document");
        } else if (success) {
            res.send("Sucessfully Deleted");
        } else {
            console.log("Null pointer");
        }
    })
})

exports = module.exports = router;