process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const models = require('../app/models/post');
const postModel = models['Post'];
const userModel = require('../app/models/user');
const demoUserToken = "THisIsADemoToken";
const username = 'DEMO';

chai.use(chaiHttp);


//GET testing all post 
function testGetAll(done){
	chai.request(server)
			.get('/api/post/all')
			.end(function(err, res){
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

//GET testing a single post by postId
function testGetSingleById(done, data){
	chai.request(server)
			.get('/api/post/' + data._id)
			.end(function(err, res){
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

//GET testing a single post by user
function testGetSingleByUser(done, username){

	chai.request(server)
			.get('/api/post/all/user/' + username)
			.end(function(err, res){
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

//GET testing all post 
function testGetAllByOrg(done, data){

	chai.request(server)
			.get('/api/post/all/org/' + data.org_name)
			.end(function(err, res){
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

//GET testing get likes
function testGetLikes(done, data){

	chai.request(server)
			.get('/api/post/likes/' + data._id)
			.end(function(err, res){
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

//POST testing post creation
function testPostCreate(done){

	let newUser = new userModel({
		userId: 'demoUserId',
		token: demoUserToken,
		email: 'email',
		name: username,
	});

	newUser.save(function(err){

	chai.request(server)
		.post('/api/post/create?access_token=' + demoUserToken)
		.send({
      		title: 'title',
      		description: 'description',
      		org_name: 'org_name',
      		repository: 'repository',
      		linkIssue: 'link',
      		user: 'username',
      		date: '19/07/2018',
      		tags: [],
      	})
      	.end(function(err, res){
      		res.should.be.json;
      		res.body.should.be.a('object');
      	 	res.body.should.have.property('success');
      	 	res.body.should.have.property('result');
      	 	res.body.should.have.property('status');
      	 	res.body.result.should.be.a('string');
      	 	res.body.status.should.equal(200);
      	 	done();	

      	 	//removing user after completing testing
      	 	userModel.remove({});
      	});
	});
}

describe('POSTS:- \n', function(){

	//before each testCase is run
 	beforeEach(function(done){
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
    
    	newPost.save(function(err) {
			done();
    	});
  	});

	//Droping Collection after every testCase
	afterEach(function(done){
    	postModel.remove({}, function(err){
    		done();
    	});
  	});


	//Testing post creation
	it('Testing /api/post/create', function(done){
		testPostCreate(done);
	});

	// Testing all posts
	it('Testing /api/post/all', function(done){
		testGetAll(done);
	});

	//Testing a single post by id
	it('Testing /api/post/:postId', function(done){
		postModel.findOne({user: username}).exec(function(err, data){		
			testGetSingleById(done , data);
		});
	});

	// Testing a all post by a single user
	it('Testing /api/post/all/user/:user', function(done, newPost){
		postModel.findOne({user: username}).exec(function(err, data){		
			testGetSingleByUser(done , username);
		});
	});

	//Testing all posts by org
	it('Testing /api/post/all/org/:organisationName', function(done, newPost){
		postModel.findOne({user: username}).exec(function(err, data){		
			testGetAllByOrg(done , data);
		});
	});

	//Testing get likes for a post
	it('Testing /api/post/likes/:postId', function(done, newPost){
		postModel.findOne({user: username}).exec(function(err, data){		
			testGetLikes(done , data);
		});
	});


});