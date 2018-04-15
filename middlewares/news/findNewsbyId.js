var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectRepository, method) {

    return function (req, res, next) {

        if (req.params.id === 'new') {
            res.tpl.news = new objectRepository.newsModel();
            console.log("Find news by id: new created");
            return next();
        }

        if (method === 'mod' || method === 'list') {
            objectRepository.newsModel
                .findOne({_id: req.params.id})
                .populate('_publisher')
                .exec(function (err, obj) {
                    if (err != null) {
                        res.tpl.error.add(err);
                        res.tpl.func.logger.error("News search failure " + err);
                    } else {
                        res.tpl.news = obj;
                        res.tpl.func.logger.info("News search success ( newsID: " + res.tpl.news._id + " )");
                    }
                    return next();
                });
        }

    }
};