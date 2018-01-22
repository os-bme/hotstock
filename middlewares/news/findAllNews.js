module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.newses = objectrepository.newsModel.find();

        if ( res.tpl.newses === null ) {
            console.log("newses find error/none");
        } else {
            console.log("newses find success");
        }

        return next();

    }
};