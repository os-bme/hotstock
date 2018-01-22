module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.tender = objectrepository.tenderModel.findOne( { _id: res.tpl.tender._id } );

        if ( res.tpl.tender === null ) {
            console.log("tender find error/none");
        } else {
            console.log("tender find success");
        }

        return next();

    }
};