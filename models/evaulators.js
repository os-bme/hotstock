var db = require( '../db' );

var EvaulatorModel = db.model( 'Evaulator', {
    _tender: {
        type: db.Schema.Types.ObjectId,
        ref: 'Tender'
    },
    _user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = EvaulatorModel;