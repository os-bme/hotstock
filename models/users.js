var db = require( '../db' );

var UserModel = db.model( 'User', {
    name: String,
    email: String,
    bme_id: Number,
    post_type: String
});

module.exports = UserModel;