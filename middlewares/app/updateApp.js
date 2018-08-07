module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app.save(function (err) {
            if (err !== null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("Application update failure " + err);
                return next(err);
            }

            res.tpl.func.logger.info("Application update success ( appID: " + res.tpl.app._id + " )");
            return next();
        });
    }

};
