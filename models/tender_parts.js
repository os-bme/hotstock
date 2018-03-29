var Schema = require('mongoose').Schema;
var db = require( '../db' );

var TenderPartModel = db.model( 'TenderPart', {
    description: String,
    title: String,
    required: Boolean,
    scorable: Boolean,
    type: Number,
    _tender: {
        type: Schema.Types.ObjectId,
        ref: 'Tender'
    },
    _publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = TenderPartModel;