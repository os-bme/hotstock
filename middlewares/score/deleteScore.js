module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.score.remove(function (err) {

            if (err !== null) {
                res.tpl.error.add(err);
                console.log("score delete error");
            } else {
                console.log("score delete success");
            }

            return next();

        });
    }
};