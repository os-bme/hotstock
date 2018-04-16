module.exports = function (objectrepository) {

    return function (req, res, next) {

        var userID = res.tpl.user._id;

        res.tpl.user.remove(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("User delete failure " + err);
            } else {
                res.tpl.func.logger.info("User delete success ( userID: " + userID + " )");
            }

            return next();


        });
    }
};