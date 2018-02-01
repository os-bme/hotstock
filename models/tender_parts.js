var Schema = require('mongoose').Schema;
var db = require( '../db' );

var TenderPartModel = db.model( 'TenderPart', {
    description: String,
    title: String,
    scorable: Boolean,
    type: 0,
    _tender: {
        type: Schema.Types.ObjectId,
        ref: 'Tender'
    }
});

module.exports = TenderPartModel;