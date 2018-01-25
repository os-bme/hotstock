module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.find( {}, function (err, obj) {

            if ( res.tpl.apps === null ) {
                res.tpl.apps = null;
                console.log("apps find error/none");
            } else {
                res.tpl.apps = obj;
                console.log("apps find success");
            }

            return next();

        });

    }
};