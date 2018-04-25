module.exports = function (objectrepository) {

    return function (req, res, next) {

        var profileImagePath = undefined;

        res.tpl.func.fileSystem.recurseSync('uploads/images/profile', [req.params.id + '.*'], function (filepath, relative, filename) {
            profileImagePath = 'uploads/images/profile/' + filename;
            console.log('Profile image search success');
        });

        if (profileImagePath === undefined) {
            profileImagePath = 'public/assets/vikhklogo.png';
            console.log('Profile image search failure');
        }

        var stat = res.tpl.func.fs.statSync(profileImagePath);

        res.writeHead(200, {
            'Content-Type': 'image/*',
            'Content-Length': stat.size
        });

        var readStream = res.tpl.func.fileSystem.createReadStream(profileImagePath);
        readStream.pipe(res);

        return;
    };

};