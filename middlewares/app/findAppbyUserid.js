module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.find( { _User: res.tpl.user._id }, function (err, obj) {
            if ( res.tpl.apps === null ) {
                res.tpl.apps = null;
                console.log("apps find error/none");
            } else {
                res.tpl.apps = obj;
                console.log("apps find success");
            }
            return next();
        } );

    }

};