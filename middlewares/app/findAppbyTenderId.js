module.exports = function (objectrepository) {

    return function (req, res, next) {

       objectrepository.appModel.find( { _tender: res.tpl.tender._id }, function (err, obj) {

           if (err != null){
               res.tpl.error.push(err);
                console.log("Apps find: error");
            } else {
                res.tpl.apps = obj;
                console.log("Apps find: success");
            }

            return next();

        } );

    }
};