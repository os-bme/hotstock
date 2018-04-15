var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectRepository, method) {

    return function (req, res, next) {

        // TODO: Correct tender creation
        if (req.params.id === 'new') {
            res.tpl.tender = new objectRepository.tenderModel();
            console.log("Find tender by id: new created");
            return next();
        }

        if (method === 'mod' || method === 'list') {
            objectRepository.tenderModel
                .findOne({_id: req.params.id})
                .populate('_publisher')
                .exec(function (err, obj) {
                    if (err != null) {
                        res.tpl.error.add(err);
                        res.tpl.func.logger.error("Tender search failure " + err);
                    } else {
                        res.tpl.tender = obj;
                        res.tpl.func.logger.info("Tender search success ( tenderID: " + res.tpl.tender._id + " )");
                    }
                    return next();
                });
        }

    }
};