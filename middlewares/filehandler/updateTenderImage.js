module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(!req.files || !req.files.tenderImage) {
            res.tpl.func.logger.info("New image for tender is not uploaded (tenderID: " + res.tpl.tender._id + ")");
            return next();
        }

        res.tpl.func.logger.info("New image for tender is uploaded (tenderID: " + res.tpl.tender._id + ")");
        var tenderImagePath = undefined;
        res.tpl.func.fileSystem.recurseSync('uploads/images/tender', [req.params.id + '.*'], function (filepath, relative, filename) {
            tenderImagePath = 'uploads/images/tender/' + filename;
        });

        if (tenderImagePath === undefined) {
            res.tpl.func.logger.verbose("Tender image search failure (tenderID: " + res.tpl.tender._id + ")");
        } else {
            res.tpl.func.logger.verbose("Tender image search success (tenderID: " + res.tpl.tender._id + ")");

            res.tpl.func.fs.unlink(tenderImagePath , function (err) {
                if (err){
                    res.tpl.func.logger.error("Image update for tender failed, old image delete failure (tenderID: " + res.tpl.tender._id + ")");
                    res.tpl.func.logger.error(err);

                    var err = new Error(err);
                    err.status = 500;
                    return next(err);
                }

                res.tpl.func.logger.info("Image for tender deleted (tenderID: " + res.tpl.tender._id + ")");
            });
        }

        var tenderImage = req.files.tenderImage;
        var tenderImageName = req.files.tenderImage.name.split('.');
        tenderImage.mv('uploads/images/tender/' + res.tpl.tender._id + '.' + tenderImageName[ tenderImageName.length-1 ] , function (err) {
            if (err){
                res.tpl.func.logger.error("Image update for tender failed, new image save failure (tenderID: " + res.tpl.tender._id + ")");
                res.tpl.func.logger.error(err);

                var err = new Error(err);
                err.status = 500;
                return next(err);
            }

            res.tpl.func.logger.info("Image for tender is saved (tenderID: " + res.tpl.tender._id + ")");
        });

        res.tpl.func.logger.info("Image update for tender succeeded (tenderID: " + res.tpl.tender._id + ")");
        return next();
    };

};