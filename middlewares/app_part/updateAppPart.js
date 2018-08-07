module.exports = function (objectrepository) {

    return function (req, res, next) {
        res.tpl.appPart._final_score = res.tpl.score._id;

        res.tpl.appPart.save(function (err) {
            if (err !== null) {
                res.tpl.error.push(err);
                res.tpl.func.logger.error("Application Part save failure " + err);
                return next(err);
            }

            res.tpl.func.logger.info("Application Part save success (appPartID: " + res.tpl.appPart._id + ")");
            return next();
        });
    }

};