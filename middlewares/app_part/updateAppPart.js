module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ( res.tpl.score != undefined ){
            res.tpl.appPart._score = res.tpl.score._id;
        }

        res.tpl.appPart.save(function (err) {

            if (err != null){
                res.tpl.error.add(err);
                console.log("AppPart update: error");
            } else {
                console.log("AppPart update: success");
            }
            return next();

        });
    }

};