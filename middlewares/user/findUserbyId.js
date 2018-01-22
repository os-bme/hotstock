module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.user = objectrepository.userModel.findOne( { bme_id: res.tpl.user.bme_id } );

        if ( res.tpl.user === null ) {
            console.log("user find error/none");
        } else {
            console.log("user find success");
        }

        return next();

    }
};