module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.userModel.find({}, function (err, obj) {

            if ( obj === null ) {
                res.tpl.users = null;
                console.log("Find all user: error/none");
            } else {
                res.tpl.users = obj;
                console.log("Find all user: success");
            }

            return next();

        });

    }
};