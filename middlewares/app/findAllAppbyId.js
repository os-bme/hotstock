module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.app = objectrepository.appModel.findOne( { _id: res.tpl.app._id } );

        if ( res.tpl.app === null ) {
            console.log("app find error/none");
        } else {
            console.log("app find success");
        }

        return next();

    }
};