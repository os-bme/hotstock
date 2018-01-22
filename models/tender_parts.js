var Schema = require('mongoose').Schema;
var db = require( '../db' );

var TenderPartModel = db.model( 'TenderPart', {
    description: String,
    title: String,
    _tender: {
        type: Schema.Types.ObjectId,
        ref: 'AppPart'
    }
});

module.exports = TenderPartModel;