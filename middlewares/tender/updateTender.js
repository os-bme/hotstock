module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (isTenderNull(res.tpl.tender)) {
            createTender(res.tpl, objectRepository);
        }
        res.tpl.tender._publisher = req.session.passport.user._id;
        copyTenderData(req.body, res.tpl.tender);
        saveTender(res, req, next);
    }
};

function isTenderNull(tender) {
    return (tender === undefined || tender === null);
}

function createTender(tpl, objectRepository) {
    tpl.tender = new objectRepository.tenderModel();
    tpl.func.logger.info("New tender created ( tenderID: " + tpl.tender._id + " )");
}

function copyTenderData(source, target) {
    target.title = source.title;
    target.start_datetime = source.startdate;
    target.end_datetime = source.enddate;
    target.publish_datetime = Date.now();
    target.short_description = source.short_description;
    target.description = source.long_description;
}

function saveTender(res, req, next) {
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