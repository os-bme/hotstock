var touchUploadsDirMW = require('./middlewares/filehandler/touchUploadsDir');
var touchImagesDirMW = require('./middlewares/filehandler/touchImagesDir');
var touchProfileDirMW = require('./middlewares/filehandler/touchProfileDir');

module.exports = function (fs) {

    touchUploadsDirMW(fs);
    touchImagesDirMW(fs);
    touchProfileDirMW(fs);

    // TODO: DB initial setup

};