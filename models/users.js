var Schema = require('mongoose').Schema;
var db = require( '../db' );

var UserModel = db.model( 'User', {
    name: String,
    email: String,
    bme_id: Number,
    post_type: String,
    permission: Number
});

module.exports = UserModel;