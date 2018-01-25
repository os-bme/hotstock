module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.tender.remove(function (err) {

            if (err !== null) {
                res.tpl.error.add(err);
                console.log("tender delete error");
            } else {
                console.log("tender delete success");
            }

            return next();

        });
    }
};