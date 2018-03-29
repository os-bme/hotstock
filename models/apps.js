var Schema = require('mongoose').Schema;
var db = require( '../db' );

var AppModel = db.model( 'App', {
    register_date: Date,
    status: Number,
    _final_score: {
        type: Schema.Types.ObjectId,
        ref: 'Score'
    },
    _tender: {
        type: Schema.Types.ObjectId,
        ref: 'Tender'
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = AppModel;