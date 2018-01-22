module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.apps = objectrepository.appModel.find( { _tender: res.tpl.tender._id } );

        if ( res.tpl.apps === null ) {
            console.log("apps find error/none");
        } else {
            console.log("apps find success");
        }

        return next();

    }
};