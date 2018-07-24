process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const models = require('../app/models/post');
const postModel = models['Post'];
const commentModel = models['Comment'];

chai.use(chaiHttp);

const username = 'DEMO';


function testGetAllCommentsForAPost(done, post){
	chai.request(server)
		.get('/api/comment/all/' + post._id)
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

function testGetSingleComment(done, comment){
	chai.request(server)
		.get('/api/comment/' + comment._id)
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
describe('Comments', function(){

	//before each testCase is run
 	beforeEach(function(done){
	   
    	let newComment = new commentModel({description: 'Comment description',
    									  user: username,
    									  date: '25/10/2018'});
    	newComment.save(function(err){

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
	afterEach(function(done){
    	postModel.remove({}, function(err){
    		commentModel.remove({}, function(err){
    			done();
    		});
    	});
  	});


	// Testing GET all comments for a post
	it('Testing /api/comment/all/:postId', function(done){
		postModel.findOne({user: username}).exec(function(err, data){
			testGetAllCommentsForAPost(done, data);
		});
	});

	// Testing GET a single comment by id
	it('Testing /api/comment/:commentId', function(done){
		commentModel.findOne({user: username}).exec(function(err, data){
			testGetSingleComment(done, data);
		});
	});



});


/*


//to comment on a post
	router.post('/:postId', function (request, response) {
		Model.commentById(request, response);
	});

//to get Comment by Id
	router.get('/:commentId', function(request, response){
		Comment.getCommentById(request, response);
	});

//to get like array of users 
  router.get('/likes/:commentId', function(request, response){ 
    Comment.getLikes(request, response); 
  });   
 
*/