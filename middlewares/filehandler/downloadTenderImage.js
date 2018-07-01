module.exports = function (objectrepository) {

    return function (req, res, next) {

        var tenderImagePath = undefined;

        res.tpl.func.fileSystem.recurseSync('uploads/images/tender', [req.params.id + '.*'], function (filepath, relative, filename) {
            tenderImagePath = 'uploads/images/tender/' + filename;
        });

        if (tenderImagePath === undefined) {
            tenderImagePath = 'public/assets/vikhklogo.png';
            res.tpl.func.logger.verbose("Tender image search failure (tenderID: " + req.params.id + ")");
        } else {
            res.tpl.func.logger.verbose("Tender image search success (tenderID: " + req.params.id + ")");
        }

        var stat = res.tpl.func.fs.statSync(tenderImagePath);

        res.writeHead(200, {
            'Content-Type': 'image/*',
            'Content-Length': stat.size
        });

        var readStream = res.tpl.func.fileSystem.createReadStream(tenderImagePath);
        readStream.pipe(res);

        // Don't return with next()! End of middleware chain!
        return;
    };

};