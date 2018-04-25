module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel
            .find({ _user: res.tpl.user._id })
            .populate('_user')
            .populate('_tender')
            .exec(function (err, obj) {
                if (err != null){
                    res.tpl.error.add(err);
                    res.tpl.func.logger.error("Application search failure " + err);
                } else {
                    res.tpl.apps = obj;
                    res.tpl.func.logger.info("Application search success ( userID: " + res.tpl.user._id + " )");
                }
                return next();
            });

    }

};
