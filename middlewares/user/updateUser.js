module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.user.save(function (err) {
            if (err !== null){
                res.tpl.error.add(err);
                console.log("user update error");
            } else {
                console.log("user update success");
            }
            return next();
        });
    }

};