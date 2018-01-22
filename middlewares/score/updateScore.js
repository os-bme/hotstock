module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.score.save(function (err) {
            if (err !== null){
                res.tpl.error.add(err);
                console.log("score update error");
            } else {
                console.log("score update success");
            }
            return next();
        });
    }

};