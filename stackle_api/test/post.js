process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const models = require('../app/models/post');
const postModel = models['Post'];
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
function testGetSingleByUser(done, data){

	chai.request(server)
			.get('/all/user/' + data.user)
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
describe('POSTS', function(){

	let newPost = {};
 	
	//before each testCase is run
 	beforeEach(function(done){
    		newPost = new postModel({
      		title: 'Post title',
      		description: 'post description',
      		org_name: 'org_name',
      		repository: 'repository',
      		linkIssue: 'link of the issue',
      		user: 'Demo User',
      		date: '19/07/2018'
      	});
    
    	newPost.save(function(err) {
      		done();
    	});
  	});

	//Droping Collection after every testCase
	afterEach(function(done){
    	postModel.collection.drop();
    	done();
  	});


	// Testing all posts
	it('Testing /api/post/all', function(done){
		testGetAll(done);
	});

	//Testing a single post by id
	it('Testing /api/post/:postId', function(done){
		testGetSingleById(done , newPost);
	});

	//Testing a single post by user
	it('Testing /api/post/all/user/:user', function(done){
		testGetSingleByUser(done , newPost);
	});


});

/*


	
//to create a post	
	router.post('/create', function (request, response) {
		Post.setPost(request, response);
	});

//to get all posts by a specific user
	router.get('/all/user/:user', function (request, response) {
		Post.getAllByUser(request, response);
	});

//to get all posts relating to specific organisation
	router.get('/all/org/:organisationName', function (request, response) {
		Post.getAllByOrg(request, response);
	});	

//to clear model - (only for developer mode)
	router.delete('/all', function(request, response){
		Post.deleteAll(request, response);
	});

//to delete a post by ID - (only for developer mode)
	router.delete('/:postId', function (request, response) {
		Post.deleteById(request, response);
	});

//to get Likes on post 
  	router.get('/likes/:postId', function(request, response){ 
    	Post.getLikes(request, response); 
 	 }); 

//to like a post 
  	router.post('/likes/up/:postId', function(request, response){ 
    	Post.setLikeUp(request, response); 
  	});   
 
//to dislike the liked post 
  	router.post('/likes/down/:postId', function(request, response){ 
    	Post.setLikeDown(request, response); 
  	});   

//to add tag to post
	router.post('/tag/add/:postId', function(request, response){
		Post.addTag(request, response);
	});

//to remove tag from post
	router.post('/tag/remove/:postId', function(request, response){
		Post.removeTag(request, response);
	});



*/
