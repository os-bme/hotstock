module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.tenderPart.remove(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Tender Part delete: error");
            } else {
                req.originalUrl = req.originalUrl.replace("/tender/new","/tender/" + res.tpl.tender._id);
                console.log("Tender Part delete: success");
            }

            return next();

        });

        var url = req.originalUrl.split("/part/");

        res.redirect( url[0] + "/part");

    }

};