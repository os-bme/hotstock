var touchUploadsDirMW = require('./middlewares/filehandler/touchUploadsDir');
var touchImagesDirMW = require('./middlewares/filehandler/touchImagesDir');
var touchProfileDirMW = require('./middlewares/filehandler/touchProfileImagesDir');
var touchTenderDirMW = require('./middlewares/filehandler/touchTenderImagesDir');
var touchNewsDirMW = require('./middlewares/filehandler/touchNewsImagesDir');

module.exports = function (fs) {

    touchUploadsDirMW(fs);
    touchImagesDirMW(fs);
    touchProfileDirMW(fs);
    touchTenderDirMW(fs);
    touchNewsDirMW(fs);

    // TODO: DB initial setup

};