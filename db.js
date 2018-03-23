var mongoose = require('mongoose');
mongoose.connect('mongodb://'+process.env.DB_HOST+'/hotstock');

module.exports = mongoose;