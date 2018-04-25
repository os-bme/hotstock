module.exports = function (objectRepository) {

    return function (req, res, next) {
        // Sikeres azonositas
        objectRepository.userModel
            .findOne({bme_id: req.user.internal_id})
            .exec(function (err, obj) {
                if (obj === null) {
                    res.tpl.user = new objectRepository.userModel();
                    res.tpl.user.bme_id = req.user.internal_id;
                    res.tpl.user.name = req.user.displayName;
                    res.tpl.user.firstname = req.user.givenName;
                    res.tpl.user.lastname = req.user.sn;
                    res.tpl.user.email = req.user.mail;
                    res.tpl.user.mobile = req.user.mobile;
                    res.tpl.user.permission = 0;

                    res.tpl.user.save(function (err) {
                        if (err !== null) {
                            res.tpl.func.logger.error("User creation failure " + err);
                            res.tpl.func.logger.info("Redirect to \'/auth/err\'");
                            return res.redirect('/auth/err');
                        } else {
                            req.session.passport.user = res.tpl.user;
<<<<<<< HEAD
                            res.tpl.func.logger.info("User creation success (userID: " + res.tpl.user._id + ", BMEID: " + req.user.internal_id + ")");
                            return next();
=======
                            res.tpl.func.logger.info("User creation success ( userID: " + res.tpl.user._id + ", BMEID: " + req.user.internal_id + " )");
                            res.tpl.func.logger.info("Redirect to \'/\'");
                            return res.redirect('/');
>>>>>>> a32d36dd0088b7e54598296f7dc1be7b00cc3f36
                        }
                    });
                } else {
                    res.tpl.user = obj;
                    req.session.passport.user.permission = obj.permission;
                    req.session.passport.user._id = obj._id;
<<<<<<< HEAD
                    res.tpl.func.logger.info("User search success (userID: " + res.tpl.user._id + ", BMEID: " + req.user.internal_id + ")");
                    return next();
=======
                    res.tpl.func.logger.info("User search success ( userID: " + res.tpl.user._id + ", BMEID: " + req.user.internal_id + " )");
                    res.tpl.func.logger.info("Redirect to \'/\'");
                    return res.redirect('/');
>>>>>>> a32d36dd0088b7e54598296f7dc1be7b00cc3f36
                }
            });
    }

};