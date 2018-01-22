module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.news = objectrepository.newsModel.findOne( { _id: res.tpl.news._id } );

        if ( res.tpl.news === null ) {
            console.log("news find error/none");
        } else {
            console.log("news find success");
        }

        return next();

    }
};