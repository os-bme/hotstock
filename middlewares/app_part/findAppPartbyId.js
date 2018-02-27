module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appPartModel.find( { _id: req.params.part },
            function (err, obj) {

            if (err != null){
                res.tpl.error.add(err);
                console.log("AppPart find: error");
            } else {
                res.tpl.appPart = obj[0];
                console.log("AppPart find: success");
            }

            return next();

        } );

    }
};