module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.newsModel.find({}, function (err, obj) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Find news: error");
            } else {
                res.tpl.newses = obj;
                console.log("Find news: success");
            }

            return next();

        });

    }
};