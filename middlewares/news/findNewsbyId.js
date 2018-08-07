module.exports = function (objectRepository) {

    return function (req, res, next) {

        if (req.params.id.trim() === "new".trim()) {
            req.params.id = null;
            console.log(req.params.id);
        }

        objectRepository.newsModel
            .findOne({_id: req.params.id})
            .exec(function (err, obj) {
                if (err != null) {
                    res.tpl.error.add(err);
                    res.tpl.func.logger.error("News search failure " + err);
                    return next(err);
                }

                if (obj === null) {
                    res.tpl.func.logger.verbose("News search success (not found)");
                } else {
                    obj.populate('_publisher');
                    res.tpl.news = obj;
                    res.tpl.func.logger.info("News search success ( newsID: " + res.tpl.news._id + " )");
                }
                return next();
            });

    }
};
