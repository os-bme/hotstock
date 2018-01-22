module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.tenders = objectrepository.tenderModel.find();

        if ( res.tpl.tenders === null ) {
            console.log("tenders find error/none");
        } else {
            console.log("tenders find success");
        }

        return next();

    }
};