var Schema = require('mongoose').Schema;
var db = require( '../db' );

var NewsModel = db.model( 'News', {
    publish_datetime: Date,
    short_description: Text,
    description: Text,
    _publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = NewsModel;