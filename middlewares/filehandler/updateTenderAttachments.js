module.exports = function (objectRepository) {

    const TENDER_ATTACHMENTS_PATH = 'uploads/attachments/tender/';

    const TENDER_ATTACHMENT_SAVE_FAILURE_LOG = "Tender Attachment save to folder failure (tenderAttachmentID: {0}) {1}";
    const TENDER_ATTACHMENT_SAVE_SUCCESS_LOG = "Tender Attachment save to folder success (tenderAttachmentID: {0})";
    const TENDER_ATTACHMENT_CREATION_FAILURE_LOG = "Tender Attachment creation failure (tenderAttachmentID: {0}) {1}";
    const TENDER_ATTACHMENT_CREATION_SUCCESS_LOG = "Tender Attachment creation success (tenderAttachmentID: {0})";

    function saveAttachmentToFolder(req, res, next, tenderAttachment) {
        tenderAttachment.mv(TENDER_ATTACHMENTS_PATH + tenderAttachment.name, function (err) {
            if (err) {
                res.tpl.func.logger.error(TENDER_ATTACHMENT_SAVE_FAILURE_LOG.format(res.tpl.tenderAttachment._id, err));
                err = new Error(err);
                err.status = 500;
                return next(err);
            } else {
                res.tpl.func.logger.info(TENDER_ATTACHMENT_SAVE_SUCCESS_LOG.format(res.tpl.tenderAttachment._id, err));
                return true;
            }
        });
    }

    function saveAttachmentToDB(req, res, next, tenderAttachment) {
        res.tpl.tenderAttachment = new objectRepository.tenderAttachmentModel();
        res.tpl.tenderAttachment.name = tenderAttachment.name;
        res.tpl.tenderAttachment.upload_date = Date.now();
        res.tpl.tenderAttachment._uploader = req.session.passport.user._id;
        res.tpl.tenderAttachment._tender = res.tpl.tender._id;

        res.tpl.tenderAttachment.save(function (err) {
            if (err !== null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error(TENDER_ATTACHMENT_CREATION_FAILURE_LOG.format(tenderAttachment.name, err)
                );
                err = new Error(err);
                err.status = 500;
                return next(err);
            } else {
                res.tpl.func.logger.info(TENDER_ATTACHMENT_CREATION_SUCCESS_LOG.format(tenderAttachment._id));
                res.tpl.tenderAttachments.push(tenderAttachment);
                return true;
            }
        });

    }

    return function (req, res, next) {
        if(!req.files || !req.files.tenderAttachments) {
            res.tpl.func.logger.info("Attachments for tender is not uploaded (tenderID: " + res.tpl.tender._id + ")");
            return next();
        }

        res.tpl.func.logger.info("Attachments for tender is uploaded (tenderID: " + res.tpl.tender._id + ")");

        var tenderAttachments;
        if (!req.files.tenderAttachments.length){
            tenderAttachments = [];
            tenderAttachments.push(req.files.tenderAttachments);
        } else {
            tenderAttachments = req.files.tenderAttachments;
        }

        res.tpl.tenderAttachments = [];
        for (var i=0; i<tenderAttachments.length; i++) {
            saveAttachmentToDB(req, res, next, tenderAttachments[i]);
            saveAttachmentToFolder(req, res, next, tenderAttachments[i]);
        }
        res.tpl.func.logger.info("Attachments update for tender succeeded (tenderID: " + res.tpl.tender._id + ", size: " + tenderAttachments.length + ")");
        return next();
    };

};