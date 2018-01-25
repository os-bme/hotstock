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

                if ( res.tpl.eva === null ) {
                    res.tpl.eva = null;
                    console.log("evaluator find error/none");
                } else {
                    res.tpl.eva = obj;
                    console.log("evaluator find success");
                }

                return next();

            }
        );

    }
};