var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appPartModel.find({_app: ObjectId(res.tpl.app._id)})
            .populate('_tender_part')
            .populate('_final_score')
            .exec(function (err, obj) {
                if (err !== null) {
                    res.tpl.error.push(err);
                    res.tpl.func.logger.error("Application Parts search failure " + err);
                    return next(err);
                }

                res.tpl.appParts = obj;
                res.tpl.func.logger.info("Application Parts search success ( length: " + res.tpl.appParts.length + " )");
                return next();
            });

    }
};