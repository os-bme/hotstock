module.exports = function (objectrepository) {

    return function (req, res, next) {

        var tenderID = res.tpl.tender._id;

        res.tpl.tender.remove(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("Tender delete failure " + err);
            } else {
                res.tpl.func.logger.info("Tender delete success ( tenderID: " + tenderID + " )");
            }

            return next();

        });
    }
};