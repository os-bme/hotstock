module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (isNewsNull(res.tpl.news)) {
            createNews(res.tpl.news, res.tpl.func.logger, objectRepository);
        }

        copyNewsData(req.body, res.tpl.news);
        res.tpl.news._publisher = req.session.passport.user._id;
        saveNews(res, req, next);
    }
};

function isNewsNull(news) {
    return (news === undefined || news === null);
}

function createNews(news, logger, objectRepository) {
    news = new objectRepository.newsModel();
    logger.info("New news created ( newsID: " + news._id + " )");
}

function copyNewsData(source, target) {
    target.title = source.title;
    target.short_description = source.short_description;
    target.description = source.long_description;
    target.publish_datetime = Date.now();
}

function saveNews(res, req, next) {
    res.tpl.news.save(function (err) {
        if (err != null) {
            res.tpl.error.add(err);
            res.tpl.func.logger.error("News update failure " + err);
        } else {
            req.originalUrl = req.originalUrl.replace("/news/new", "/news/" + res.tpl.news._id);
            res.tpl.func.logger.info("News update success (newsID: " + res.tpl.news._id + ")");
        }
        return next();
    });
}