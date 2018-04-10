var mongoose = require('mongoose');

mongoose.connect(
	process.env.DB_CONNECTION_STRING,
	function(err) {
		if (err){
			console.log(err);
	}
});

module.exports = mongoose;

