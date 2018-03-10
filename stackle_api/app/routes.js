// application -------------------------------------------------------------
const User = require('./models/user');
const Stack = require('./models/stack');

const postModels = require('./models/post')

const Post = postModels.Post;
const Comment = postModels.Comment;

module.exports = function (app, db) {

    //api
    app.get('/api/login/', function (req, res) {
        res.status(501).send("Not Implemented");
    });

    app.get('/home', function (req, res) {
        //needs to intergrate with github for implementation
        // Status code would be 501 since not implemented yet
        res.status(501).end();
    });

    //get all posts
    app.get('/api/posts', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        Post.find({}, function (err, posts) {
            if (err) {
                console.log("Cant get all posts!");
                res.status(500).send("error getting all the posts");
            } else {
                res.send(posts);
            }
        });
    });

	//save a post
	app.post('/api/user/post', function (req, res) {
		let post = new Post(req.body);
		post.save(function (err, post) {
			if (err) {
				console.log("error saving the post");
				res.status(500).send("error!")
			} else {
				res.status(201).send("Sucessfully saved the post!");
			}
		});
	})

	//get a post by id
	app.get('/api/post/:postid', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let objectid = req.params.postid;
		Post.findOne({ _id: objectid }, function (err, post) {
			if (err) {
				res.status(404).send(err);
			} else {
				res.status(200).send(post);
			}
		})
	})

	//delete a post by ID
	app.delete('/api/post/:postid', function (req, res) {
		let postid = req.params.postid;
		Post.remove({ _id: postid }, function (err, success) {
			if (err) {
				console.log(err);
				res.status(500).send("Error deleting the document");
			} else if (success) {
				res.status(200).send("Sucessfully Deleted");
			} else {
				console.log("Null pointer");
        res.status(500).send("Error");
			}
		})
	})

	//returns posts by a specific user
	app.get('/api/posts/:user', function (req, res) {
		let id = req.params.user;
		Post.find({ user: id }, function (err, posts) {
			if (err){
        console.log("Erorr getting posts");
        res.status(500).send("Error");
      } else {
        res.status(200).send(posts);
      }
		});
	});

	//returns posts relating to specific org
	app.get('/api/posts/org/:org_name', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		let orgname = req.params.org_name;
		Post.find({ org_name: orgname }, function (err, posts) {
			if (err) {
        console.log(`Error getting posts from $orgname`);
        res.status(500).send(`Error getting posts from ${orgname}`);
      } else {
        res.send(posts);
      }
		})
	})

	//get a specific org
  app.get('/api/org/:orgname', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let orgname = req.params.orgname;
    Stack.find({name: orgname}, function (err, org) {
      if (err) {
        console.log('Error');
        res.status(500).send("Error");
      } else {
        res.status(200).send(org);
      }
    });
  });

	//comment on a post
	app.post('/api/comment/:postid', function (req, res) {
		let postid = req.params.postid;
		let query = { _id: postid };
		let comment = new Comment(req.body);
		Post.update(query, { comments: [] });
	})
  
  //get all stacks (orgs)
    app.get('/api/orgs', function (req, res) {
        Stack.find({}, function (err, stacks) {
            if (err) {
                console.log("Errors retrieving stacks!");
                res.status(500).send("Error retrieving stacks!");
            } else {
                res.status(200).send(stacks);
            }
        });
    });

	//create stack
	app.post('/api/stack/create', function (req, res) {
		let stack = new Stack(req.body);
		stack.save(function (err, stack) {
			if (err) {
				console.log("Error saving the stack to database");
				res.status(500).send("Error saving stack!");
			} else if (stack) {
				res.status(201).send("Sucessfully created the stack");
			} else {
				res.status(500).send("Null");
			}
		})
	})

	//delete stack
	app.delete('api/delete/stack/:stackid', function (req, res) {
		let stack_id = req.params.stackid;
		Stack.remove({ _id: stack_id }, function (err, success) {
			if (err) {
				res.status(500).send("Couldn't delete Stack");
			} else {
				res.status(200).send("");
			}
		})
	})

	//user subscribing to an stack
	app.post('/api/subscribe', function (req, res) {
		let userid = req.body.uid;
		let stackname = req.body.stack_name;
		let query = { userId : userid };
		User.findOneAndUpdate(query, {$push: {subscribedStacks : stackname}}, function(err, noaffected){
			if(err){
				res.status(500).send("Error Updating");
			}else{
				res.status(200).send("Success!!");
			}
		});
	})

	//getting subscribed stacks for a user
	app.get('/api/stack/subscribed/:userid', function(req ,res){
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		User.findOne({userId : req.params.userid}, function(err, result){
			if(err){
				res.status(500).send(err);
			}else if(result){
				let sub_stack = result.subscribedStacks;
				res.status(200).send(sub_stack);
			}else{
				res.status(500).send("Can't get!");
			}
		})
	})

	//create user
	app.post('/api/newuser', function (req, res) {
		let user = new User(req.body);
		user.save(function (err, user) {
			if (err) {
				console.log("Error saving the stack to database");
				res.status(500).send("Error saving user!");
			} else {
				res.status(201).send("Sucessfully created the user");
			}
		})
	})

	app.get('/api/notifications', function (req, res) { });

}
