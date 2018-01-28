module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.eva.remove(function (err) {

            if (err !== null) {
                res.tpl.error.add(err);
                console.log("evaluator delete error");
            } else {
                console.log("evaluator delete success");
            }

            return next();

        });
    }
};