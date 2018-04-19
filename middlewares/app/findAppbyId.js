var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel
            .findOne({_id: ObjectId(req.params.id)})
            .populate('_user')
            .populate('_tender')
            .exec(function (err, obj) {
                if (err !== null) {
                    res.tpl.error.add(err);
                    res.tpl.func.logger.error("Application search failure " + err);
                } else {
                    res.tpl.app = obj;
                    res.tpl.func.logger.info("Application search success ( appID: " + res.tpl.app._id + " )");
                }
                return next();
            });

    }
};