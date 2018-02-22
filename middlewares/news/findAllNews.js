module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.newsModel.find({}, function (err, obj) {

            if ( obj === null ) {
                res.tpl.newses = null;
                console.log("Find news: error/none");
            } else {
                res.tpl.newses = obj;
                console.log("Find news: success");
            }

            return next();

        });

    }
};