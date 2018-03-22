module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.userModel.find({}, function (err, obj) {

            if (err != null) {
                res.tpl.error.add(err);
                console.log("Find all user: error");
            } else {
                res.tpl.users = obj;
                console.log("Find all user: success");
            }

            return next();

        });

    }
};