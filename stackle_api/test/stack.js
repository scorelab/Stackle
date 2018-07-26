process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const stackModel = require('../app/models/stack');
const stackName = 'testStack';
const BASEURL = '/api/org/';
const userModel = require('../app/models/user');
const demoUserToken = "THisIsADemoToken";
const username = 'DEMO';

chai.use(chaiHttp);

//GET testing all stack 
function testGetAllStack(done){
	chai.request(server)
			.get(BASEURL + 'all')
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

//GET testing a single stack by user
function testGetStackByName(done, stackName){
	chai.request(server)
			.get(BASEURL + 'name/' + stackName)
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

//POST testing stack creation
function testStackCreate(done){

	let newUser = new userModel({
		userId: 'demoUserId',
		token: demoUserToken,
		email: 'email',
		name: username,
	});

	newUser.save(function(err){
		chai.request(server)
		.post(BASEURL +  'create?access_token=' + demoUserToken)
		.send({
      		name: 'name',
      		description: 'description',
      		stackleUrl: 'url_link',
      		linkIssue: 'link_Issue',
      		createdUser: 'demo',
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

      	 	//removing user after testing
      	 	newUser.remove({});
      	});
	});

	
}

//GET testing a single stack by ID
function testGetStackById(done, stack){
	chai.request(server)
			.get(BASEURL + 'id/' + stack._id)
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

//Note TODO : Kindly Turn OFF the Authentication on post request before test cases are run
describe('STACK', function(){

	//before each testCase is run
 	beforeEach(function(done){
	    let newStack = new stackModel({
      		name: stackName,
      		description: 'This is a testing stack',
      		stackleUrl: 'demoUrl',
      		createdUser: 'demoUser',
      	});
    
    	newStack.save(function(err) {
			done();
    	});
  	});

	//Droping Collection after every testCase
	afterEach(function(done){
    	stackModel.remove({}, function(err){
    		done();
    	});
  	});

	//Testing stack creation
	it('Testing /api/org/create', function(done){
		testStackCreate(done);
	});

	// Testing all stacks
	it('Testing /api/org/all', function(done){
		testGetAllStack(done);
	});

	//Testing GET stack  by name
	it('Testing /api/org/name/:organisationName', function(done){
		testGetStackByName(done, stackName);
	});

	//Testing GET stack  by ID
	it('Testing /api/org/id/:stackId', function(done){
		stackModel.findOne({name: stackName}, function(err, stack){
			testGetStackById(done, stack);
		});
	});
});