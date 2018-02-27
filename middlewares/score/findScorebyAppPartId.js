module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.scoreModel.findOne( { _app_part: res.tpl.app_part._id }, function (err, obj) {

            if (err != null) {
                res.tpl.error.add(err);
                console.log("Score find: error");
            } else {
                if ( obj == null ){
                    res.tpl.score = new objectrepository.scoreModel();
                    console.log("Score find: new created");
                } else {
                    res.tpl.score = obj;
                    console.log("Score find: success");
                }
            }

            return next();

        } );

    }
};