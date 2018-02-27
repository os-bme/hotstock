var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectRepository, method) {

    return function (req, res, next) {

        if (req.params.id === 'new') {
            res.tpl.news = new objectRepository.newsModel();
            console.log("Find news by id: new created");
            return next();
        }

        if (method === 'mod') {
            objectRepository.newsModel.findOne( { _id: req.params.id }, function (err, obj) {

                if (err != null) {
                    res.tpl.error.add(err);
                    console.log("Find news by ID: error");
                } else {
                    res.tpl.news = obj;
                    console.log("Find news by ID: success");
                }
                return next();
            })
        }

        if (method === 'list') {
            objectRepository.newsModel.aggregate(
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

                    if (err != null) {
                        res.tpl.error.add(err);
                        console.log("Find news by id: error");
                    } else {
                        res.tpl.news = obj[0];
                        console.log(obj[0]);
                        console.log("Find news by id: success");
                    }
                    return next();
                }
            );
        }

    }
};