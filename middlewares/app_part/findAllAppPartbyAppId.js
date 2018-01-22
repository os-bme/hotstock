module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app_parts = objectrepository.AppPartModel.find( { _app: res.tpl.app._id } );

        if ( res.tpl.app_parts === null ) {
            console.log("app_parts find error/none");
        } else {
            console.log("app_parts find success");
        }

        return next();

    }
};