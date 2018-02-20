var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectRepository, method) {

    return function (req, res, next) {


        if (req.params.id === 'new') {
            res.tpl.tender = new objectRepository.tenderModel();
            console.log("Find tender by id: new created");
            return next();
        }

        if (method === 'mod') {
            objectRepository.tenderModel.findOne( { _id: req.params.id }, function (err, obj) {
                if (res.tpl.tender === null) {
                    res.tpl.tender = null;
                    console.log("Find tender by ID: error/none");
                } else {
                    res.tpl.tender = obj;
                    console.log("Find tender by ID: success");
                }
                return next();
            })
        }

        if (method === 'list') {
            objectRepository.tenderModel.aggregate(
                { $match: {
                    _id: ObjectId(req.params.id)
                }},
                { $lookup: {
                    from: 'users',
                    localField: '_publisher',
                    foreignField: '_id',
                    as: 'publisher'
                }},
                { $unwind: '$publisher'},
                function (err, obj) {
                    if (res.tpl.tender === null) {
                        res.tpl.tender = null;
                        console.log("Find tender by ID: error/none");
                    } else {
                        res.tpl.tender = obj[0];
                        console.log("Find tender by ID: success");
                    }
                    return next();
                }
            );
        }

    }
};