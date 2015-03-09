var mongo = require('mongoose');
	 Schema = mongo.Schema;

var usersSchema = new Schema({
	name: { first: String, last: String },
	email: String
});

mongo.model('users', usersSchema);