var Schema = require('mongoose').Schema;
var db = require( '../db' );

var ScoreModel = db.model( 'Score', {
    value: Number,
    comment: String,
    _evaluator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _app_part: {
        type: Schema.Types.ObjectId,
        ref: 'AppPart'
    }
});

module.exports = ScoreModel;