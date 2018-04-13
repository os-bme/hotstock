module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.scoreModel.findOne( { _app_part: res.tpl.appPart._id }, function (err, obj) {

            if (err != null) {
                res.tpl.error.push(err);
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