module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.scores = [];

        for( var app_part in res.tpl.app_parts ){

            res.tpl.scores.add(objectrepository.scoreModel.findOne( { _app_part: app_part._id } ));

        }

        if ( res.tpl.scores === null ) {
            console.log("scores find error/none");
        } else {
            console.log("scores find success");
        }

        return next();

    }
};