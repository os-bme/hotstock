module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app = new objectrepository.appModel();

        res.tpl.app._tender = res.tpl.tender._id;
        res.tpl.app._user = req.session.passport.user._id;
        res.tpl.app.status = 0;
        res.tpl.app.register_date = Date.now();

        res.tpl.app.save(function (err) {
            if (err != null){
                res.tpl.error.add(err);
                console.log("App creation: error");
            } else {
                console.log("App creation: success");
            }
            return next();
        });
    }

};