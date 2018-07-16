var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectRepository) {

    return function (req, res, next) {

        objectRepository.tenderModel
            .findOne({_id: req.params.id})
            .exec(function (err, obj) {
                if (err != null) {
                    res.tpl.error.add(err);
                    res.tpl.func.logger.error("Tender search failure " + err);
                    return;
                }

                if (obj === null){
                    res.tpl.func.logger.verbose("Tender search success (not found)");
                } else {
                    obj.populate('_publisher');
                    res.tpl.tender = obj;
                    res.tpl.func.logger.verbose("Tender search success ( tenderID: " + res.tpl.tender._id + " )");
                }

                return next();
            });
    }

};
