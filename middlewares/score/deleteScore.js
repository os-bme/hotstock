module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.score.remove(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                console.log("Score deletion: error");
            } else {
                console.log("Score deletion: success");
            }

            return next();

        });
    }
};