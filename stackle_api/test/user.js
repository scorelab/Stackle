process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const models = require('../app/models/post');
const postModel = models['Post'];
const userModel = require('../app/models/user');

const demoUserToken = "THis_Is_A_Demo_Token";
const demoUserName = 'DEMO_User_ID_NAME';

chai.use(chaiHttp);


//GET testing all Uers 
function testGetAll(done){
	chai.request(server)
			.get('/api/user/all')
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

//GET testing a single user by userId
function testGetSingleByUserId(done){
	chai.request(server)
			.get('/api/user/' + demoUserName)
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


//GET testing a single user by DB_id
function testGetSingleByDBId(done, user){
	chai.request(server)
			.get('/api/user/id/' + user._id)
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



//GET testing a single user by DB_id
function testGetStacksList(done){
	chai.request(server)
			.get('/api/user/stacks/' + demoUserName)
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


//POST testing user creation
function testUserCreate(done){
	chai.request(server)
		.post('/api/user/create?access_token=' + demoUserToken)
		.send({
      		userId: 'userid',
      		token: 'token',
      		email: 'userEmail',
      		name: 'name',
      		picUrl: 'linkPic',
      		profileUrl: 'linkProfile',
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
      	});
}


//Grouping user testCases
describe('POSTS', function(){

	//before each testCase is run
 	beforeEach(function(done){
	    let newUser = new userModel({
      		userId: demoUserName,
      		token: demoUserToken,
      		email: 'email',
      		name: demoUserName,
      		picUrl: 'piclink',
      		profileUrl: 'profileLink',
      	});
    
    	newUser.save(function(err) {
			done();
    	});
  	});

	//Droping Collection after every testCase
	afterEach(function(done){
    	userModel.remove({}, function(err){
    		done();
    	});
  	});

	// Testing GET User all
	it('Testing /api/user/all', function(done){
		testGetAll(done);
	});

	// Testing GET User by userID
	it('Testing /api/user/:userId', function(done){
		testGetSingleByUserId(done);
	});

	// Testing GET User by DB ID
	it('Testing /api/user/id/:id', function(done){
		userModel.findOne({userId: demoUserName}, function(err, user){
			testGetSingleByDBId(done, user);
		});
		
	});

	// Testing GET subscribe stacks by userId
	it('Testing /api/user/stacks/:userId', function(done){
		testGetStacksList(done);
	});

	//Testing POST: creating a USER
	it('Testing /api/user/create', function(done){
		testUserCreate(done);
	});

});
