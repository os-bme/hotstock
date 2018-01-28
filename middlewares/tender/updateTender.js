module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.tender.save(function (err) {

            if (err !== null){
                res.tpl.error.add(err);
                console.log("tender update error");
            } else {
                console.log("tender update success");
            }

            return next();

        });


    }

};