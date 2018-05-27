module.exports = function (objectrepository) {

    return function (req, res, next) {

        var tenderImagePath = undefined;

        res.tpl.func.fileSystem.recurseSync('uploads/images/tender', [req.params.id + '.*'], function (filepath, relative, filename) {
            tenderImagePath = 'uploads/images/tender/' + filename;
            console.log('Tender image search success');
        });

        if (tenderImagePath === undefined) {
            tenderImagePath = 'public/assets/vikhklogo.png';
            console.log('Tender image search failure');
        }

        var stat = res.tpl.func.fs.statSync(tenderImagePath);

        res.writeHead(200, {
            'Content-Type': 'image/*',
            'Content-Length': stat.size
        });

        var readStream = res.tpl.func.fileSystem.createReadStream(tenderImagePath);
        readStream.pipe(res);

        return;
    };

};