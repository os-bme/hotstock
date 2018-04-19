module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app = new objectrepository.appModel();

        // TODO: Correct app creation
        res.tpl.app._tender = res.tpl.tender._id;
        res.tpl.app._user = req.session.passport.user._id;
        res.tpl.app.status = 0;
        res.tpl.app.register_date = Date.now();

        res.tpl.app.save(function (err) {
            if (err !== null) {
                res.tpl.error.add(err);
                res.tpl.func.logger.error("Application creation failure " + err);
            } else {
                res.tpl.func.logger.info("Application creation success ( appID: " + res.tpl.app._id + " )");
            }
            return next();
        });
    }

};