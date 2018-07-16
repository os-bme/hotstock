module.exports = function (objectRepository) {

    return function (req, res, next) {

        if (isTenderNull(res.tpl.tender)) {
            createTender(res.tpl.tender, res.tpl.func.logger, objectRepository);
        }

        copyData(req.body, res.tpl.tender);
        res.tpl.tender._publisher = req.session.passport.user._id;

        res.tpl.tender.save(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("Tender update failure " + err);
            } else {
                req.originalUrl = req.originalUrl.replace("/tender/new", "/tender/" + res.tpl.tender._id);
                res.tpl.func.logger.info("Tender update success ( tenderID: " + res.tpl.tender._id + " )");
            }

            return next();

        });


    }

};

function createTender(tender, logger, objectRepository) {
    tender = new objectRepository.tenderModel();
    logger.info("New tender created ( tenderID: " + res.tpl.tender._id + " )");
}

function isTenderNull(tender) {
    return (tender === undefined || tender === null);
}

function copyData(source, target) {
    target.title = source.title;
    target.start_datetime = source.startdate;
    target.end_datetime = source.enddate;
    target.publish_datetime = Date.now();
    target.short_description = source.short_description;
    target.description = source.long_description;
}
