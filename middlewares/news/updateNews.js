module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.news.title = req.body.title;
        res.tpl.news.short_description = req.body.short_description;
        res.tpl.news.description = req.body.long_description;
        res.tpl.news._publisher = req.session.passport.user._id;
        res.tpl.news.publish_datetime = Date.now();

        res.tpl.news.save(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("News update failure " + err);
            } else {
                req.originalUrl = req.originalUrl.replace("/news/new","/news/" + res.tpl.news._id);
                res.tpl.func.logger.info("News update success ( appID: " + res.tpl.app._id + " )");
            }

            return next();

        });
    }

};
