var db = require( '../db' );

var AppModel = db.model( 'App', {
    register_datetime: Date,
    is_accepted: Boolean,
    _tender: {
        type: db.Schema.Types.ObjectId,
        ref: 'Tender'
    },
    _user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = AppModel;