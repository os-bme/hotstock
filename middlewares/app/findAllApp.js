module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel
            .find({})
            .populate('_user')
            .populate('_tender')
            .exec(function (err, obj) {
                if (err !== null) {
                    res.tpl.error.add(err);
                    res.tpl.func.logger.error("Application listing failure " + err);
                } else {
                    res.tpl.apps = obj;
                    res.tpl.func.logger.info("Application listing success");
                }
                return next();
            });

    }
};
