module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app.remove(function (err) {

            if (err !== null) {
                res.tpl.error.add(err);
                console.log("app delete error");
            } else {
                console.log("app delete success");
            }

            return next();

        });
    }
};