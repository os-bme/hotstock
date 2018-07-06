module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(!req.files || !req.files.tenderAttachments) {
            res.tpl.func.logger.info("Attachments for tender is not uploaded (tenderID: " + res.tpl.tender._id + ")");
            return next();
        }

        res.tpl.func.logger.info("Attachments for tender is uploaded (tenderID: " + res.tpl.tender._id + ")");
        var tenderAttachmentsPath = undefined;
        res.tpl.func.fileSystem.recurseSync('uploads/attachments/tender', [req.params.id + '_*'], function (filepath, relative, filename) {
            tenderAttachmentsPath = 'uploads/attachments/tender/' + filename;
        });

        if (tenderAttachmentsPath === undefined) {
            res.tpl.func.logger.verbose("Tender attachments search failure (tenderID: " + res.tpl.tender._id + ")");
        } else {
            res.tpl.func.logger.verbose("Tender attachments search success (tenderID: " + res.tpl.tender._id + ")");

            res.tpl.func.fs.unlink(tenderAttachmentsPath , function (err) {
                if (err){
                    res.tpl.func.logger.error("Attachments update for tender failed, old attachments delete failure (tenderID: " + res.tpl.tender._id + ")");
                    res.tpl.func.logger.error(err);

                    var err = new Error(err);
                    err.status = 500;
                    return next(err);
                }

                res.tpl.func.logger.info("Attachments for tender deleted (tenderID: " + res.tpl.tender._id + ")");
            });
        }

        var tenderAttachments;
        if (!req.files.tenderAttachments.length){
            tenderAttachments = [];
            tenderAttachments.push(req.files.tenderAttachments);
        } else {
            tenderAttachments = req.files.tenderAttachments;
        }

        for (var i=0; i<tenderAttachments.length; i++) {
            var tenderAttachmentName = tenderAttachments[i].name;
            tenderAttachments[i].mv('uploads/attachments/tender/' + res.tpl.tender._id + '_' + tenderAttachmentName, function (err) {
                if (err) {
                    res.tpl.func.logger.error("Attachments update for tender failed, attachments save failure (tenderID: " + res.tpl.tender._id + ", attachmentName: " + tenderAttachmentName + ")");
                    res.tpl.func.logger.error(err);

                    var err = new Error(err);
                    err.status = 500;
                    return next(err);
                }

                res.tpl.func.logger.info("Attachments for tender is saved (tenderID: " + res.tpl.tender._id + ", attachmentName: " + tenderAttachmentName + ")");
            });
        }
        res.tpl.func.logger.info("Attachments update for tender succeeded (tenderID: " + res.tpl.tender._id + ", size: " + tenderAttachments.length + ")");
        return next();
    };

};