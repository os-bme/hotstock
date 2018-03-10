var Schema = require('mongoose').Schema;
var db = require( '../db' );

var AppPartModel = db.model( 'AppPart', {
    content: String,
    score: Number,
    _app: {
        type: Schema.Types.ObjectId,
        ref: 'App'
    },
    _tender_part: {
        type: Schema.Types.ObjectId,
        ref: 'TenderPart'
    }
});

module.exports = AppPartModel;