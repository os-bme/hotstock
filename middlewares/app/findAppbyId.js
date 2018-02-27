var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.findOne( {_id: ObjectId(req.params.id)} )
            .populate('_user')
            .populate('_tender')
            .exec(function (err, obj) {
                if (err != null) {
                    res.tpl.error.add(err);
                    console.log("App find: error");
                } else {
                    res.tpl.app = obj;
                    console.log("App find: success");
                }
                return next();
            });

    }
};