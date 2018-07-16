module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.userModel
            .findOne({_id: req.params.id})
            .exec(function (err, obj) {
                    if (err !== null) {
                        res.tpl.error.add(err);
                        res.tpl.func.logger.error("User search failure " + err);
                    } else {
                        res.tpl.user = obj;
                        res.tpl.func.logger.info("User search success (userID: " + res.tpl.user._id + ")");
                    }
                    return next();
                }
            );

    }

};
