module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.eva = objectrepository.evaModel.findOne(
            {
                $and:
                [
                    { _user: res.tpl.user._id },
                    { _tender: res.tpl.tender._id }
                ]
            }
        );

        if ( res.tpl.eva === null ) {
            console.log("evaluator find error/none");
        } else {
            console.log("evaluator find success");
        }

        return next();

    }
};