module.exports = function (objectrepository) {

    return function (req, res, next) {

        var newsImagePath = undefined;

        res.tpl.func.fileSystem.recurseSync('uploads/images/news', [req.params.id + '.*'], function (filepath, relative, filename) {
            newsImagePath = 'uploads/images/news/' + filename;
            res.tpl.func.logger.verbose("News image search success (newsID: " + req.params.id + ")");
        });

        if (newsImagePath === undefined) {
            newsImagePath = 'public/assets/vikhklogo.png';
            res.tpl.func.logger.verbose("News image search failure (newsID: " + req.params.id + ")");
        }

        var stat = res.tpl.func.fs.statSync(newsImagePath);

        res.writeHead(200, {
            'Content-Type': 'image/*',
            'Content-Length': stat.size
        });

        var readStream = res.tpl.func.fileSystem.createReadStream(newsImagePath);
        readStream.pipe(res);

        return;
    };

};