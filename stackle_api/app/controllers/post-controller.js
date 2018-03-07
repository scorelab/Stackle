// @ts-check

const postModel = require("../models/post")

const Post = postModel.Post

class PostController {

    constructor() {

    }

    // Crud

    savePost(req, res) {

        let singlePost = new Post(req.body)

        singlePost.save().then(post => {

            res.status(200).json(post)

        }).catch(err => {
            res.status(500).json("Error Saving Post")
        })

    }


    // cRud

    getAll(req, res) {

        Post.find({}).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            console.log(err);
        })

    }


    getOne(req, res) {

        let postID = req.params.postid;
        let query = Post.findOne({ _id: postID })

        query.exec().then(post => {
            res.status(200).json(post)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        })


    }

    // cruD
    deletePost(req, res) {

        let postID = req.params.postid

        let query = Post.remove({ _id: postID })

        query.exec().then(success => {
            console.log(success);
            res.status(200).json("Post Deleted")
        }).catch(err => {
            console.log("--------error-------")
            console.log(err)
            res.send(500).json("Error Deleting")
        })
    }



    // Helper Function

    getPostByOrganization(req, res) {
        let organizationName = req.params.orgname;

        let query = Post.find({ org_name: organizationName })

        query.exec().then(post => {
            res.status(200).json(post)
        }).catch(err => {
            console.log(err)
            res.status(500).json(`Error getting post from ${organizationName}`)
        })
    }


    getPostByUser(req, res) {
        let userID = req.params.user;

        let query = Post.find({ user: userID })
        query.exec().then(post => {
            res.status(200).json(post)
        }).catch(err => {
            console.log(err)
            res.status(500).json("Error getting post for user")
        })



    }


}

module.exports = new PostController();