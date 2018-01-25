module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.scores = [];

        var query = {
            $or: []
        };

        for( var app_part in res.tpl.app_parts ){
            query.$or.add( {  _app_part: app_part._id } );
        }

        objectrepository.scoreModel.findOne( query, function (err,obj) {

            if ( res.tpl.scores === null ) {
                res.tpl.scores = null;
                console.log("scores find error/none");
            } else {
                res.tpl.scores = obj;
                console.log("scores find success");
            }

            return next();

        });

    }

};