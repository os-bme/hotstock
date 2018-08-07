module.exports = function (objectRepository) {

    return function (req, res, next) {

        objectRepository.appPartModel.findOne({_id: req.params.part})
            .populate('_score')
            .exec(function (err, obj) {
                if (err != null) {
                    res.tpl.error.push(err);
                    res.tpl.func.logger.error("Application Part search failure " + err);
                    return next(err);
                }

                res.tpl.appPart = obj;
                res.tpl.func.logger.info("Application Part search success ( appPartID: " + res.tpl.appPart._id + " )");
                return next();
            });

    }
};