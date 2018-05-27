module.exports = function (objectrepository) {

    return function (req, res, next) {

        var newsImagePath = undefined;

        res.tpl.func.fileSystem.recurseSync('uploads/images/news', [req.params.id + '.*'], function (filepath, relative, filename) {
            newsImagePath = 'uploads/images/news/' + filename;
            console.log('Tender image search success');
        });

        if (newsImagePath === undefined) {
            newsImagePath = 'public/assets/vikhklogo.png';
            console.log('Tender image search failure');
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