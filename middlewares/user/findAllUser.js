module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.userModel
            .find({})
            .exec(function (err, obj) {
                if (err !== null) {
                    res.tpl.error.add(err);
                    res.tpl.func.logger.error("User listing failure " + err);
                } else {
                    res.tpl.users = obj;
                    res.tpl.func.logger.info("User listing success ( size: " + obj.length + " )");
                }
                return next();
            });

    }

};
