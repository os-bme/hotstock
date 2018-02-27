module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appPartModel.findOne({_id: req.params.part})
            .populate('_score')
            .exec(function (err, obj) {
                if (err != null) {
                    res.tpl.error.add(err);
                    console.log("AppPart find: error");
                } else {
                    res.tpl.appPart = obj;
                    console.log("AppPart find: success");
                }
                return next();
            });

    }
};