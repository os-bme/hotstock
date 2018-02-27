module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.tender.title = req.body.title;
        res.tpl.tender.start_datetime = req.body.startdate;
        res.tpl.tender.end_datetime = req.body.enddate;
        res.tpl.tender.publish_datetime = Date.now();
        res.tpl.tender.short_description = req.body.short_description;
        res.tpl.tender.description = req.body.long_description;
        res.tpl.tender._publisher = req.session.passport.user._id;


        res.tpl.tender.save(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                console.log("Tender update: error");
            } else {
                req.originalUrl = req.originalUrl.replace("/tender/new","/tender/" + res.tpl.tender._id);
                console.log("Tender update: success");
            }

            return next();

        });


    }

};