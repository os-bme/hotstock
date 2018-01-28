module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.newsModel.find({}, function (err, obj) {

            if ( res.tpl.newses === null ) {
                res.tpl.newses = null;
                console.log("newses find error/none");
            } else {
                res.tpl.newses = obj;
                console.log("newses find success");
            }

            return next();

        });

    }
};