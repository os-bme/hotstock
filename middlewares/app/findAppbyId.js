var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectRepository) {

    return function (req, res, next) {

        objectRepository.appModel
            .findOne({_id: ObjectId(req.params.id)})
            .populate('_user')
            .populate('_tender')
            .exec(function (err, obj) {
                if (err !== null) {
                    res.tpl.error.push(err);
                    res.tpl.func.logger.error("Application search failure " + err);
                    return next(err);
                }

                res.tpl.app = obj;
                res.tpl.func.logger.info("Application search success ( appID: " + res.tpl.app._id + " )");
                return next();
            });

    }
};
