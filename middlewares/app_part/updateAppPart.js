module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app_part.save(function (err) {
            if (err !== null){
                res.tpl.error.add(err);
                console.log("app_part update error");
            } else {
                console.log("app_part update success");
            }
            return next();
        });
    }

};