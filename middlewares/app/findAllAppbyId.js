module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.find( { _id: res.tpl.app._id }, function (err, obj) {

            if (err != null){
                res.tpl.error.add(err);
                console.log("App find: error");
            } else {
                res.tpl.app = obj;
                console.log("App find: success");
            }

            return next();

        } );

    }
};