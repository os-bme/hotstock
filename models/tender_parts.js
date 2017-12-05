var db = require( '../db' );

var TenderPartModel = db.model( 'TenderPart', {
    description: String,
    title: String,
    _tender: {
        type: db.Schema.Types.ObjectId,
        ref: 'AppPart'
    }
});

module.exports = TenderPartModel;