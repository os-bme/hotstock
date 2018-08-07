module.exports = function (objectRepository) {

    return function (req, res, next) {

        if ( !req.isAuthenticated() ) {
            res.tpl.func.logger.warn("Unauthorized user - Access denied to User function ( IP: " + res.tpl.func.reqIP(req) + " )");
            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }

        res.tpl.func.logger.verbose("User authenticated (permission level: " + req.session.passport.user.permission + ")");
        return next();

    };
};