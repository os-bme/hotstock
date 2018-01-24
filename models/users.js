var Schema = require('mongoose').Schema;
var db = require( '../db' );

var UserModel = db.model( 'User', {
    name: String,
    email: String,
    bme_id: String,
    post_type: String,
    permission: Number
});

module.exports = UserModel;