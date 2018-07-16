module.exports = function (objectrepository) {

    return function (req, res, next) {

        var tenderPartID = res.tpl.tenderPart._id;

        res.tpl.tenderPart.remove(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Tender Part delete failure " + err);
            } else {
                req.originalUrl = req.originalUrl.replace("/tender/new","/tender/" + res.tpl.tender._id);
                console.log("Tender Part delete success (tenderPartID: " + tenderPartID + ")");
            }

            return next();

        });

        var url = req.originalUrl.split("/part/");

        res.redirect( url[0] + "/part");

    }

};