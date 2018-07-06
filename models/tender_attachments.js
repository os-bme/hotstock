var Schema = require('mongoose').Schema;
var db = require( '../db' );

var TenderAttachmentModel = db.model( 'TenderAttachment', {
    name: String,
    upload_datetime: Date,
    _tender: {
        type: Schema.Types.ObjectId,
        ref: 'Tender'
    },
    _uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = TenderAttachmentModel;