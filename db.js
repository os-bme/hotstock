var mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {useMongoClient: true},
    function (err) {
        if (err) {
            console.log(err);
        }
    });

module.exports = mongoose;

