module.exports = function (objectRepository) {

    return function (req, res, next) {

        var newsID = res.tpl.news._id;

        objectRepository.newsModel.findOne({_id: req.params.id}).remove(function (err) {

            if (err !== null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("News delete failure " + err);
            } else {
                res.tpl.func.logger.info("News delete success ( newsID: " + newsID + " )");
            }

            return next();

        });
    }
};
