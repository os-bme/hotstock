module.exports = function (objectrepository) {

    return function (req, res, next) {

       objectrepository.appModel.find( { _tender: res.tpl.tender._id }, function (err, obj) {

            if (err != null) {
                res.tpl.error.push(err);
                res.tpl.func.logger.error("Application search failure " + err);
            } else {
                res.tpl.apps = obj;
                res.tpl.func.logger.info("Application search success ( tenderID: " + res.tpl.tender._id + " )");
            }

            return next();

        });

    }
};
