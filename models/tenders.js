var db = require( '../db' );

var TenderModel = db.model( 'Tender', {
    name: String,
    start_datetime: Date,
    end_datetime: Date,
    datasheet_template: String
});

module.exports = TenderModel;