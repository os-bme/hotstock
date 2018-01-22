module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.score = objectrepository.scoreModel.findOne( { _app_part: res.tpl.app_part._id } );

        if ( res.tpl.score === null ) {
            console.log("score find error/none");
        } else {
            console.log("score find success");
        }

        return next();

    }
};