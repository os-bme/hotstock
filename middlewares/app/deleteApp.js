module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app.remove(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("App delete: error");
            } else {
                console.log("App delete: success");
            }

            return next();

        });
    }
};