module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.score.remove(function (err) {

            var scoreID = res.tpl.score._id;

            if (err != null) {
                res.tpl.error.push(err);
                res.tpl.func.logger.error("Score deletion failure " + err);
            } else {
                res.tpl.func.logger.info("Score deletion (scoreID: " + scoreID + ")");
            }

            return next();

        });
    }
};