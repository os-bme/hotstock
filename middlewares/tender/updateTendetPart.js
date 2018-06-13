module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.tenderPart.title = req.body.title;
        res.tpl.tenderPart.description = req.body.description;
        res.tpl.tenderPart.required = req.body.required === 'true';
        res.tpl.tenderPart.scorable = req.body.scorable === 'true';
        res.tpl.tenderPart.type = req.body.type;
        res.tpl.tenderPart._tender = res.tpl.tender._id;

        res.tpl.tenderPart.save(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Tender Part update: error");
            } else {
                req.originalUrl = req.originalUrl.replace("/tender/new","/tender/" + res.tpl.tender._id);
                console.log("Tender Part update: success");
            }


            var url = req.originalUrl.split("/part/");

            res.redirect( url[0] + "/part");
            return;

        });

    }

};
