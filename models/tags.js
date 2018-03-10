var Schema = require('mongoose').Schema;
var db = require( '../db' );

var TagModel = db.model( 'Tag', {
    fullname: String,
    shortname: String
});

module.exports = TagModel;