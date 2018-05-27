module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(!req.files) {
            var err = new Error('No files were uploaded.');
            err.status = 404;
            return next(err);
        }

        var profileImage = req.files.profileImage;
        var profileImageName = req.files.profileImage.name.split('.');
        profileImage.mv('uploads/images/profile/' + res.tpl.user._id + '.' + profileImageName[ profileImageName.length-1 ] , function (err) {
            if (err){
                console.log(err);

                var err = new Error(err);
                err.status = 500;
                return next(err);
            }

            console.log('File uploaded!');
            return next();
        });

    };

};