module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.AppPartModel.findOne( { _id: res.tpl.app_part._id }, function (err, obj) {

            if ( res.tpl.app_part === null ) {
                res.tpl.app_part = null;
                console.log("app_part find error/none");
            } else {
                res.tpl.app_part = obj;
                console.log("app_part find success");
            }

            return next();

        } );

    }
};