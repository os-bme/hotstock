module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.tenderModel.findOne( { _id: res.tpl.tender._id }, function (err, obj) {

            if ( res.tpl.tender === null ) {
                res.tpl.tender = null;
                console.log("tender find error/none");
            } else {
                res.tpl.tender = obj;
                console.log("tender find success");
            }

            return next();

        } );

    }
};