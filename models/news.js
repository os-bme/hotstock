var Schema = require('mongoose').Schema;
var db = require( '../db' );

var NewsModel = db.model( 'News', {
    publish_datetime: Date,
    title: String,
    short_description: String,
    description: String,
    _publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = NewsModel;