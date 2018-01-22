module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.news.remove(function (err) {
            if (err !== null) {
                res.tpl.error.add(err);
                console.log("news delete error");
            } else {
                console.log("news delete success");
            }
            return next();
        });
    }
};