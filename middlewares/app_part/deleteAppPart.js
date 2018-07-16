module.exports = function (objectrepository) {

    return function (req, res, next) {

        var appPartID = res.tpl.appPart._id;

        res.tpl.appPart.remove(function (err) {

            if (err !== null){
                res.tpl.error.push(err);
                res.tpl.func.logger.error("Application delete failure " + err);
            } else {
                res.tpl.func.logger.info("AppPart delete success (appPartID: " + appPartID + ")");
            }
            return next();
        });
    }
};