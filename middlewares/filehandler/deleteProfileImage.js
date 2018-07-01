module.exports = function (objectrepository) {

    return function (req, res, next) {

        var profileImagePath = undefined;

        res.tpl.func.fileSystem.recurseSync('uploads/images/profile', [req.params.id + '.*'], function (filepath, relative, filename) {
            profileImagePath = 'uploads/images/profile/' + filename;
            res.tpl.func.logger.info("Profile image search success (userID: " + req.params.id + ")");
        });

        if (profileImagePath !== undefined) {

            res.tpl.func.fs.unlink( profileImagePath , function (err) {
                if (err){
                    res.tpl.func.logger.error("Image for user profile delete failure (userID: " + req.params.id + ")");
                    res.tpl.func.logger.error(err);

                    var err = new Error(err);
                    err.status = 500;
                    return next(err);
                }

                res.tpl.func.logger.info("Image for user profile deleted (userID: " + req.params.id + ")");
                return next();
            });

        } else {
            return next();
        }

    };

};