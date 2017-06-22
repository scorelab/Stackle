// application -------------------------------------------------------------

module.exports = function(app){
	//api
	app.get('/api/login/', function(req,res){
		res.send("Hello");
		console.log("in");
	})

	app.get('/home', function(req,res){
		

	})

	app.get('/api/posts', function(req,res){
		
	})

	app.get('/api/:org_id', function(req,res){

	})

	app.get('/api/notifications', function(req,res){
		
	})

	app.get('/api/')

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});

}
