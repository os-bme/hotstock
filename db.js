var mongoose = require('mongoose');

mongoose.connect(
	process.env.DB_HOST, {
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
		dbName: process.env.DB_NAME
	},
	function(err) {
		if (err){
			console.log(err);
	}
});

module.exports = mongoose;

