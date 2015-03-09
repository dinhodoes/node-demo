var express 	 = require('express');
		app			   = express();

		fs         = require('fs');
		bodyParser = require('body-parser');
		server     = require('http').createServer(app);
		path       = require('path');
		mongo      = require('mongoose');



//// CONFIG ////
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


fs.readdirSync(__dirname + '/models').forEach(function(filename) {
	if (~filename.indexOf('js')) require(__dirname + '/models/' + filename)
});


//// MIDDLEWARE ////
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//// DEFINE ROUTES ////
var router = require('./routes/blocks');

app.use('/', router);

app.get('/users.json', function(req, res) {
	mongo.model('users'). find(function(err, users) {
		res.send(users);
	});
});


//// DEVELOPMENT ONLY ////
if ('development' == app.get('env')) {
  // app.use(express.errorHandler());
  mongo.connect('mongodb://localhost/bakery');
}


//// PORT ////
server.listen(3000, function() {
	console.log('Listening on port 3000... ');
});

module.exports = app;