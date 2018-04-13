module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.news.remove(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Delete news: error");
            } else {
                console.log("Delete news: success");
            }

            return next();

        });
    }
};