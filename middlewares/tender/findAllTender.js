module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.tenderModel.find({}, function (err, obj) {

            if ( res.tpl.tenders === null ) {
                res.tpl.tenders = null;
                console.log("tenders find error/none");
            } else {
                res.tpl.tenders = obj;
                console.log("tenders find success");
            }

            return next();

        });

    }
};