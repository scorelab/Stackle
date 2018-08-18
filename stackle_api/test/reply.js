process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const models = require('../app/models/post');
const replyModel = models['Reply'];
const commentModel = models['Comment'];
const userModel = require('../app/models/user');
const demoUserToken = "THisIsADemoToken";
const username = 'DEMO';

chai.use(chaiHttp);

// testing GET all replies for a single comment
function testGetAllRepliesForAComment(done, comment) {
    chai.request(server)
        .get('/api/reply/all/' + comment._id)
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

// testing GET single reply by id 
function testGetReplyById(done, reply) {
    chai.request(server)
        .get('/api/reply/' + reply._id)
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

//testing POST creating a reply
function testReplyCreate(done, comment) {

    let newUser = new userModel({
        userId: 'demoUserId',
        token: demoUserToken,
        email: 'email',
        name: username,
    });

    newUser.save(function(err) {
        chai.request(server)
            .post('/api/reply/' + comment._id + '?access_token=' + demoUserToken)
            .send({
                description: 'reply Demo description',
                user: 'demousername1',
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

//Grouping of testCases
describe('Reply:- \n', function() {

    //before each testCase is run
    beforeEach(function(done) {

        let newReply = new replyModel({
            description: 'Reply description',
            user: username,
            date: '25/10/2018'
        });
        newReply.save(function(err) {

            let newComment = new commentModel({
                description: 'Comment description',
                user: username,
                date: '19/10/2018'
            });

            newComment.replies.push(newReply._id);
            newComment.save(function(err) {
                done();
            });

        });

    });

    //Droping Collection after every testCase
    afterEach(function(done) {
        commentModel.remove({}, function(err) {
            replyModel.remove({}, function(err) {
                done();
            });
        });
    });

    // Testing GET all replies for a comment
    it('Testing /api/reply/all/:commentId', function(done) {
        commentModel.findOne({
            user: username
        }).exec(function(err, data) {
            testGetAllRepliesForAComment(done, data);
        });
    });

    // Testing GET a reply by ID
    it('Testing /api/reply/:replyId', function(done) {
        replyModel.findOne({
            user: username
        }, function(err, data) {
            testGetReplyById(done, data);
        });
    });

    // Testing POST creating reply
    it('Testing /api/reply/:commentId', function(done) {
        commentModel.findOne({
            user: username
        }).exec(function(err, data) {
            testReplyCreate(done, data);
        });
    });
});