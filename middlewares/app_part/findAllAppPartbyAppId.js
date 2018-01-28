module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.AppPartModel.find( { _app: res.tpl.app._id }, function (err, obj) {

            if ( res.tpl.app_parts === null ) {
                res.tpl.app_parts = null;
                console.log("app_parts find error/none");
            } else {
                res.tpl.app_parts = obj;
                console.log("app_parts find success");
            }

            return next();

        } );

    }
};