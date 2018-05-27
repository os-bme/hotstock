module.exports = function (objectrepository) {

    return function (req, res, next) {

        var profileImagePath = undefined;

        res.tpl.func.fileSystem.recurseSync('uploads/images/profile', [req.params.id + '.*'], function (filepath, relative, filename) {
            profileImagePath = 'uploads/images/profile/' + filename;
            console.log('Profile image search success');
        });

        if (profileImagePath !== undefined) {

            res.tpl.func.fs.unlink( profileImagePath , function (err) {
                if (err){
                    console.log(err);

                    var err = new Error(err);
                    err.status = 500;
                    return next(err);
                }

                console.log("Image for user profile deleted");
                return next();
            });

        } else {
            return next();
        }

    };

};