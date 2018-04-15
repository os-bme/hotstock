module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.find({_id: res.tpl.app._id}, function (err, obj) {

            if (err != null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("Application list search failure " + err);
            } else {
                res.tpl.app = obj;
                res.tpl.func.logger.info("Application list search success ( appID: " + res.tpl.app._id + " )");
            }

            return next();

        });

    }
};
