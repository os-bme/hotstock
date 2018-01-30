var Schema = require('mongoose').Schema;
var db = require( '../db' );

var UserModel = db.model( 'User', {
    name: String,
    firstname: String,
    lastname: String,
    neptun: String,
    status: Number,
    birth_date: Date,
    birth_place: String,
    email: String,
    mobile: String,
    bme_id: String,
    permission: Number
});

module.exports = UserModel;