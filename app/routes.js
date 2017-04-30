// application -------------------------------------------------------------

module.exports = function(app){
	//api
	app.get('/api/login/', function(req,res){
		res.send("Hello");
		console.log("in");
	})

	app.get('/home', function(req,res){

	})

	app.get('/api/home/posts', function(req,res){
		
	})

	app.get('/api/home/:org_id', function(req,res){

	})

	app.get('/api/home/notifications', function(req,res){
		
	})

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

}
