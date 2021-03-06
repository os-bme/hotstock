module.exports = function (objectrepository) {

    return function (req, res, next) {

        if( req.session.passport.user.permission == 3 ){
            res.tpl.user.firstname = req.body.firstname;
            res.tpl.user.lastname = req.body.lastname;
            res.tpl.user.name = req.body.lastname + " " + req.body.firstname;
            res.tpl.user.neptun = req.body.neptun;
        }

        res.tpl.user.status = req.body.status;
        res.tpl.user.birth_date = req.body.birthdate;
        res.tpl.user.birth_place = req.body.birthplace;
        res.tpl.user.email = req.body.email;
        res.tpl.user.mobile = req.body.mobile;
        res.tpl.user.notification = (req.body.notification == 'true');

        res.tpl.user.save(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("User update failure " + err);
            } else {
                res.tpl.func.logger.info("User update success ( userID: " + res.tpl.user._id + " )");
            }

            return next();

        });
    }

};
