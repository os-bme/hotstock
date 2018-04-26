module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (req.isAuthenticated()) {
            res.tpl.func.logger.info("Redirect to \'/\' ");
            res.redirect('/');
        } else {
            return next();
        }
    };

};