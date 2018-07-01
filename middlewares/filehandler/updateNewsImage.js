module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(!req.files || !req.files.newsImage) {
            res.tpl.func.logger.info("New image for news is not uploaded (newsID: " + res.tpl.news._id + ")");
            return next();
        }

        res.tpl.func.logger.info("New image for news is uploaded (newsID: " + res.tpl.news._id + ")");
        var newsImagePath = undefined;
        res.tpl.func.fileSystem.recurseSync('uploads/images/news', [req.params.id + '.*'], function (filepath, relative, filename) {
            newsImagePath = 'uploads/images/news/' + filename;
        });

        if (newsImagePath === undefined) {
            res.tpl.func.logger.verbose("News image search failure (newsID: " + res.tpl.news._id + ")");
        } else {
            res.tpl.func.logger.verbose("News image search success (newsID: " + res.tpl.news._id + ")");

            res.tpl.func.fs.unlink(newsImagePath , function (err) {
                if (err){
                    res.tpl.func.logger.error("Image update for news failed, old image delete failure (newsID: " + res.tpl.news._id + ")");
                    res.tpl.func.logger.error(err);

                    var err = new Error(err);
                    err.status = 500;
                    return next(err);
                }

                res.tpl.func.logger.info("Image for news deleted (newsID: " + res.tpl.news._id + ")");
            });
        }

        var newsImage = req.files.newsImage;
        var newsImageName = req.files.newsImage.name.split('.');
        newsImage.mv('uploads/images/news/' + res.tpl.news._id + '.' + newsImageName[ newsImageName.length-1 ] , function (err) {
            if (err){
                res.tpl.func.logger.error("Image update for news failed, new image save failure (newsID: " + res.tpl.news._id + ")");
                res.tpl.func.logger.error(err);

                var err = new Error(err);
                err.status = 500;
                return next(err);
            }

            res.tpl.func.logger.info("Image for news is saved (newsID: " + res.tpl.news._id + ")");
        });

        res.tpl.func.logger.info("Image update for news succeeded (newsID: " + res.tpl.news._id + ")");
        return next();
    };

};