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

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Scores find: error");
            } else {
                res.tpl.scores = obj;
                console.log("Scores find: success");
            }

            return next();

        });

    }

};