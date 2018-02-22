module.exports = function (objectrepository) {

    return function (req, res, next) {

         objectrepository.userModel.findOne(
             {
                 _id: req.params.id
             },
             function (err, obj) {
                 if ( obj === null ) {
                     res.tpl.user = null;
                     console.log("Find user by id: error/none");
                 } else {
                     res.tpl.user = obj;
                     console.log("Find user by id:  success");
                    }
                 return next();
                 }
         );

    }
};