module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.evaModel.findOne(
            {
                $and:
                [
                    { _user: res.tpl.user._id },
                    { _tender: res.tpl.tender._id }
                ]
            },
            function (err, obj) {

                if (err != null) {
                    res.tpl.error.push(err);
                    console.log("Evaluator find: error");
                } else {
                    res.tpl.eva = obj;
                    console.log("Evaluator find: success");
                }

                return next();

            }
        );

    }
};