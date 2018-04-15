module.exports = function (objectrepository) {

    return function (req, res, next) {

        var appID = res.tpl.app._id;

        res.tpl.app.remove(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("Application delete failure " + err);
            } else {
                res.tpl.func.logger.info("Application delete success ( appID: " + appID + " )");
            }

            return next();

        });
    }
};
