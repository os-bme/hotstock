module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.user.permission = req.body.permission;

        res.tpl.user.save(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("User permission update failure " + err);
            } else {
                res.tpl.func.logger.info("User permission update success ( userID: " + res.tpl.user._id + " )");
            }

            return next();

        });
    }

};
