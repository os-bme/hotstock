module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.tenderPart = new objectrepository.tenderPartModel();
        console.log("Tender Part creation: success");
        return next();

    }

};