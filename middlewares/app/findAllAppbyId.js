module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.findOne( { _id: res.tpl.app._id }, function (err, obj) {

            if ( res.tpl.app === null ) {
                res.tpl.app = null;
                console.log("app find error/none");
            } else {
                res.tpl.app = obj;
                console.log("app find success");
            }

            return next();

        } );

    }
};