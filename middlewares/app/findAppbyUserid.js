module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.find( { _User: res.tpl.user._id }, function (err, obj) {

            if (err != null){
                res.tpl.error.add(err);
                console.log("Apps find: error");
            } else {
                res.tpl.apps = obj;
                console.log("Apps find: success");
            }
            return next();
        } );

    }

};