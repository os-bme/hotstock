module.exports = function (objectrepository) {

    return function (req, res, next) {
        res.tpl.func.logger.info("Redirect to \'/app/" + res.tpl.app._id + "\'");
        res.redirect( '/app/' + res.tpl.app._id );
    };

};