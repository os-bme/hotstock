module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.users = objectrepository.userModel.find();

        if ( res.tpl.users === null ) {
            console.log("users find error/none");
        } else {
            console.log("users find success");
        }

        return next();

    }
};