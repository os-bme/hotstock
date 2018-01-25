module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.user.remove(function (err) {

            if (err !== null) {
                res.tpl.error.add(err);
                console.log("user delete error");
            } else {
                console.log("user delete success");
            }

            return next();


        });
    }
};