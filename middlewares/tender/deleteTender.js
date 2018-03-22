module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.tender.remove(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                console.log("Tender deletion: error");
            } else {
                console.log("Tender deletion: success");
            }

            return next();

        });
    }
};