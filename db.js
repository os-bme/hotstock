var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hotstock');

module.exports = mongoose;