module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app_part = objectrepository.AppPartModel.findOne( { _id: res.tpl.app_part._id } );

        if ( res.tpl.app_part === null ) {
            console.log("app_part find error/none");
        } else {
            console.log("app_part find success");
        }

        return next();

    }
};