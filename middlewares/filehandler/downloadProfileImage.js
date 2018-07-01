module.exports = function (objectrepository) {

    return function (req, res, next) {

        var profileImagePath = undefined;

        res.tpl.func.fileSystem.recurseSync('uploads/images/profile', [req.params.id + '.*'], function (filepath, relative, filename) {
            profileImagePath = 'uploads/images/profile/' + filename;
        });

        if (profileImagePath === undefined) {
            profileImagePath = 'public/assets/vikhklogo.png';
            res.tpl.func.logger.verbose("Profile image search failure (userID: " + req.params.id + ")");
        } else {
            res.tpl.func.logger.verbose("Profile image search success (userID: " + req.params.id + ")");
        }

        var stat = res.tpl.func.fs.statSync(profileImagePath);

        res.writeHead(200, {
            'Content-Type': 'image/*',
            'Content-Length': stat.size
        });

        var readStream = res.tpl.func.fileSystem.createReadStream(profileImagePath);
        readStream.pipe(res);

        // Don't return with next()! End of middleware chain!
        return;
    };

};