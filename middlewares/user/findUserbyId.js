module.exports = function (objectrepository) {

    return function (req, res, next) {

         objectrepository.userModel.findOne( { bme_id: res.tpl.user.bme_id }, function (err, obj) {

             if ( obj === null ) {
                 res.tpl.user = null;
                 console.log("user find error/none");
             } else {
                 res.tpl.user = obj;
                 console.log("user find success");
             }

             return next();

         } );

    }
};