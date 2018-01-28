module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.userModel.find({}, function (err, obj) {

            if ( res.tpl.users === null ) {
                res.tpl.users = null;
                console.log("users find error/none");
            } else {
                res.tpl.users = obj;
                console.log("users find success");
            }

            return next();

        });

    }
};