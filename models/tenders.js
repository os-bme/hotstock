var Schema = require('mongoose').Schema;
var db = require( '../db' );

var TenderModel = db.model( 'Tender', {
    name: String,
    start_datetime: Date,
    end_datetime: Date,
    publish_datetime: Date,
    short_description: String,
    description: String,
    datasheet_template: String,
    _publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = TenderModel;