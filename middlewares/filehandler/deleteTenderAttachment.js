module.exports = function (objectrepository) {

    return function (req, res, next) {

        var tenderAttachmentID = res.tpl.tenderAttachment._id;

        res.tpl.tenderAttachment.remove(function (err) {

            if (err !== null) {
                res.tpl.error.push(err);
                res.tpl.func.logger.error("Tender Attachment delete failure " + err);
            } else {
                res.tpl.func.logger.info("Tender Attachment delete success (tenderAttachmentID: " + tenderAttachmentID + ")");
            }

            return next();

        });
    }
};
