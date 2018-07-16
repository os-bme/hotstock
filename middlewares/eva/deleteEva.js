module.exports = function (objectrepository) {

    return function (req, res, next) {

        var evaID = res.tpl.eva._id;

        res.tpl.eva.remove(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                res.tpl.func.logger.error("Evaluator delete failure " + err);
            } else {
                res.tpl.func.logger.info("Evaluator delete success (evaID: " + evaID + ")");
            }

            return next();

        });
    }
};