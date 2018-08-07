module.exports = function (objectRepository) {

    return function (req, res, next) {

        objectRepository.scoreModel.findOne({_app_part: res.tpl.appPart._id}, function (err, obj) {

            if (err != null) {
                res.tpl.error.push(err);
                res.tpl.func.logger.error("Score search failure " + err);
                return next(err);
            }

            if (obj == null) {
                res.tpl.func.logger.info("Score search success (not found)");
            } else {
                res.tpl.score = obj;
                res.tpl.func.logger.info("Score search success (scoreID: " + res.tpl.score._id + ")");
            }
            return next();

        });

    }
};