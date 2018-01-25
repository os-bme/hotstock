module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.scoreModel.findOne( { _app_part: res.tpl.app_part._id }, function (err, obj) {

            if ( res.tpl.score === null ) {
                res.tpl.score = null;
                console.log("score find error/none");
            } else {
                res.tpl.score = obj;
                console.log("score find success");
            }

            return next();

        } );

    }
};