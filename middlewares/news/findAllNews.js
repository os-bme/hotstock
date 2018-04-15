module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.newsModel
            .find({})
            .exec(function (err, obj) {
                if (err != null) {
                    res.tpl.error.add(err);
                    res.tpl.func.logger.error("News listing failure " + err);
                } else {
                    res.tpl.newses = obj;
                    res.tpl.func.logger.info("News listing success ( size: " + obj.length + " )");
                }
                return next();
            });

    }
};
