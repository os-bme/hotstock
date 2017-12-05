var db = require( '../db' );

var ScoreModel = db.model( 'Score', {
    value: Number,
    _evaulator: {
        type: db.Schema.Types.ObjectId,
        ref: 'Evaulator'
    },
    _app_part: {
        type: db.Schema.Types.ObjectId,
        ref: 'AppPart'
    }
});

module.exports = ScoreModel;