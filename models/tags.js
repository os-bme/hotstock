var Schema = require('mongoose').Schema;
var db = require( '../db' );

var TagModel = db.model( 'Tag', {
    full_name: String,
    short_name: String
});

module.exports = TagModel;