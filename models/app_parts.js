var Schema = require('mongoose').Schema;
var db = require( '../db' );

var AppPartModel = db.model( 'AppPart', {
    name:String,
    max_score: Number,
    _app: {
        type: Schema.Types.ObjectId,
        ref: 'App'
    },
    _tender: {
        type: Schema.Types.ObjectId,
        ref: 'Tender'
    }
});

module.exports = AppPartModel;