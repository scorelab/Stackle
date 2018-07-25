process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const stackModel = require('../app/models/stack');
const stackName = 'testStack';
const BASEURL = '/api/org/';
chai.use(chaiHttp);


/*

const stackSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    stackleUrl: { type: String, required: true, unique: true},
    githubUrl: String,
    createdUser: { type: String, required: true, unique: false}
});

*/

//GET testing all post 
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


//GET testing a single post by user
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


/*

//POST testing post creation

function testPostCreate(done){
	chai.request(server)
		.post('/api/post/create')
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

      	});
}

*/


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


	//Testing post creation
	// it('Testing /api/post/create', function(done){
		// testPostCreate(done);
	// });

	// Testing all stacks
	it('Testing /api/org/all', function(done){
		testGetAllStack(done);
	});

	//Testing a single post by id
	it('Testing /api/org/name/:organisationName', function(done){
		testGetStackByName(done, stackName);
	});

/*

	// Testing a single post by user
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

*/

});


/*


//create a Stack
	router.post('/create', function(request, response){
		Model.createStack(request, response);
	});

//get All stacks
	router.get('/all', function(request, response){
		Model.getAll(request, response);
	});	

//get stack by name
	router.get('/name/:organisationName', function(request, response){
		Model.getByName(request, response);
	});


// Get stack by id 
	router.get('/id/:stackId', function(request, response){
		Model.getById(request, response);
	});



*/