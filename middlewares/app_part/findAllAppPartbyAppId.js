var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appPartModel.find({_app: ObjectId(res.tpl.app._id)})
            .populate('_tender_part')
            .populate('_score')
            .exec(function (err, obj) {
                if (err !== null) {
                    res.tpl.error.add(err);
                    console.log("AppParts find: error");
                } else {
                    res.tpl.appParts = obj;
                    console.log("AppParts find: success");
                }
                return next();
            });

    }
};