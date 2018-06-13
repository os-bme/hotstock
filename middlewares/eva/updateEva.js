module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.eva.save(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Evaluator update: error");
            } else {
                console.log("Evaluator update: success");
            }
            return next();
        });
    }

};