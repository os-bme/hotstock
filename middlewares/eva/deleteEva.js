module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.eva.remove(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Evaluator delete: error");
            } else {
                console.log("Evaluator delete: success");
            }

            return next();

        });
    }
};