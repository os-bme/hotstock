var Schema = require('mongoose').Schema;
var db = require( '../db' );

var EvaluatorModel = db.model( 'Evaluator', {
    _tender: {
        type: Schema.Types.ObjectId,
        ref: 'Tender'
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    permission: Number
});

module.exports = EvaluatorModel;