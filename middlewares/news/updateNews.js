module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.news.save(function (err) {
            if (err !== null){
                res.tpl.error.add(err);
                console.log("news update error");
            } else {
                console.log("news update success");
            }
            return next();
        });
    }

};