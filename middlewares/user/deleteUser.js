module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.user.remove(function (err) {

            if (err !== null) {
                res.tpl.error.add(err);
                console.log("User delete: error");
            } else {
                console.log("User delete: success");
            }

            return next();


        });
    }
};