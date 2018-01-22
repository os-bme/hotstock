module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app_part.remove(function (err) {
            if (err !== null) {
                res.tpl.error.add(err);
                console.log("app_part delete error");
            } else {
                console.log("app_part delete success");
            }
            return next();
        });
    }
};