var touchUploadsDirMW = require('./middlewares/filehandler/touchUploadsDir');

var touchImagesDirMW = require('./middlewares/filehandler/touchImagesDir');
var touchAttachmentsDirMW = require('./middlewares/filehandler/touchAttachmentsDir');

var touchProfileDirMW = require('./middlewares/filehandler/touchProfileImagesDir');
var touchTenderDirMW = require('./middlewares/filehandler/touchTenderImagesDir');
var touchNewsDirMW = require('./middlewares/filehandler/touchNewsImagesDir');

var touchTenderAttachmentsDirMW = require('./middlewares/filehandler/touchTenderAttachmentsDir');

module.exports = function (fs) {

    touchUploadsDirMW(fs);

    touchImagesDirMW(fs);
    touchAttachmentsDirMW(fs);

    touchProfileDirMW(fs);
    touchTenderDirMW(fs);
    touchNewsDirMW(fs);

    touchTenderAttachmentsDirMW(fs);

    // TODO: DB initial setup

};