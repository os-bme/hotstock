module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.eva.save(function (err) {
            if (err !== null){
                res.tpl.error.add(err);
                console.log("evaluator update error");
            } else {
                console.log("evaluator update success");
            }
            return next();
        });
    }

};