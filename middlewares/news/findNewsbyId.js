module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.newsModel.findOne( { _id: res.tpl.news._id }, function (err, obj) {

            if ( res.tpl.news === null ) {
                res.tpl.news = null;
                console.log("news find error/none");
            } else {
                res.tpl.news = obj;
                console.log("news find success");
            }

            return next();

        } );

    }
};