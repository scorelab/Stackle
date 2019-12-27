process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const models = require('../app/models/post');
const postModel = models['Post'];
const commentModel = models['Comment'];
const userModel = require('../app/models/user');
const demoUserToken = "THisIsADemoToken";
const username = 'DEMO';
const mongoose = require('mongoose');
const userId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

chai.use(chaiHttp);

// testing GET all comments for a single post
function testGetAllCommentsForAPost(done, post) {
    chai.request(server)
        .get('/api/comment/all/' + post._id)
        .end(function(err, res) {

            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('success');
            res.body.should.have.property('result');
            res.body.status.should.equal(200);
            res.body.result.should.be.a('array');
            done();
        });

}

// testing GET single comment 
function testGetSingleComment(done, comment) {
    chai.request(server)
        .get('/api/comment/' + comment._id)
        .end(function(err, res) {

            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('success');
            res.body.should.have.property('result');
            res.body.status.should.equal(200);
            res.body.result.should.be.a('object');
            done();
        });
}

//testing POST creating a comment
function testCommentCreate(done, post) {

    let newUser = new userModel({
        userId: 'demoUserId',
        token: demoUserToken,
        email: 'email',
        name: username,
    });

    newUser.save(function(err) {
        chai.request(server)
            .post('/api/comment/' + post._id + '?access_token=' + demoUserToken)
            .send({
                description: 'Comment description',
                user: 'username',
                date: '19/07/2018'
            })
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('result');
                res.body.should.have.property('status');
                res.body.result.should.be.a('object');
                res.body.status.should.equal(200);
                done();

                //removing user after completing testing
                userModel.remove({});

            });
    });
}

// testing GET single comment 
function testGetLikesUser(done, comment) {
    chai.request(server)
        .get('/api/comment/likes/' + comment._id)
        .end(function(err, res) {

            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('success');
            res.body.should.have.property('result');
            res.body.status.should.equal(200);
            res.body.result.should.be.a('array');
            done();
        });
}

// to add user to like in comment
function setLikeUpCommentHelper(done, comment){
    chai.request(server)
        .post('/api/comment/likes/up/' + comment._id)
        .send({
            userId: userId
        })
        .end(function(err, res){
            res.should.be.json;
            res.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('success');
            res.body.should.have.property('result');
            res.body.status.should.equal(200);
            done();
        });
}

// to unlike the comment 
function setLikeDownCommentHelper(done, comment) {
    chai.request(server)
        .post('/api/comment/likes/down/' + comment._id)
        .send({
            userId: userId
        })
        .end(function (err, res) {
            res.should.be.json;
            res.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('success');
            res.body.should.have.property('result');
            res.body.status.should.equal(200);
            done();
        });
}

// To get the comment by user 
function getCommentByUser(done, data){
    chai.request(server)
        .get('/api/comment/all/user/' + data.user)
        .send({
            user: data.user
        })
        .end(function(err, res){
            res.should.be.json;
            res.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('success');
            res.body.should.have.property('result');
            res.body.status.should.equal(200);
            done();
        });
}

describe('Comments:- \n', function() {

    //before each testCase is run
    beforeEach(function(done) {

        let newComment = new commentModel({
            description: 'Comment description',
            user: username,
            date: '25/10/2018'
        });
        newComment.save(function(err) {

            let newPost = new postModel({
                title: 'Post_title',
                description: 'post_description',
                org_name: 'org_name',
                repository: 'repository',
                linkIssue: 'link',
                user: username,
                tags: [],
                date: '19/07/2018'
            });

            newPost.comments.push(newComment._id);
            newPost.save(function(err) {
                done();
            });

        });

    });

    //Droping Collection after every testCase
    afterEach(function(done) {
        postModel.remove({}, function(err) {
            commentModel.remove({}, function(err) {
                done(); 
            });
        });
    });

    // Testing GET all comments for a post
    it('Testing /api/comment/all/:postId', function(done) {
        postModel.findOne({
            user: username
        }).exec(function(err, data) {
            testGetAllCommentsForAPost(done, data);
        });
    });

    // Testing GET a single comment by id
    it('Testing /api/comment/:commentId', function(done) {
        commentModel.findOne({
            user: username
        }).exec(function(err, data) {
            testGetSingleComment(done, data);
        });
    });

    // Testing GET likes array of users 
    it('Testing /api/comment/likes/:commentid', function(done) {
        commentModel.findOne({
            user: username
        }).exec(function(err, data) {
            testGetLikesUser(done, data);
        });
    });

    // Testing POST creating comment
    it('Testing /api/comment/:postId', function(done) {
        postModel.findOne({
            user: username
        }).exec(function(err, data) {
            testCommentCreate(done, data);
        });
    });

    // Testing likes up by a user 
    it('Testing /api/comment/likes/up/:commentId', function(done){
        commentModel.findOne({
             user: username
         })
        .exec(function(err, data){
            setLikeUpCommentHelper(done, data);
        });
    });

    // Testing likes down by a user 
    it('Testing /api/comment/likes/down/:commentId', function(done){
        commentModel.findOne({
            user: username
        })
        .exec(function(err, data){
            setLikeDownCommentHelper(done, data);
        });
    });

    // To get comment by a user 
    it('Testing /all/user/:user', function (done) {
        commentModel.findOne({
            user: username
        })
        .exec(function(err, data){
            getCommentByUser(done, data);
        });
    });
});