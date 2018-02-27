module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app_part.remove(function (err) {

            if (err != null){
                res.tpl.error.add(err);
                console.log("AppPart delete: error");
            } else {
                console.log("AppPart delete: success");
            }
            return next();
        });
    }
};