module.exports = function (objectrepository) {

    return function (req, res, next) {

        if (!req.isAuthenticated() || !req.session.passport || req.session.passport.user.permission < 2) {

            var userID = res.tpl.func.userID(req) ;

            res.tpl.func.logger.warn("Unauthorized user - Access denied to Admin function ( IP: " + res.tpl.func.reqIP(req) + " )");
            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }

        res.tpl.func.logger.verbose("Admin authenticated (permission level: " + req.session.passport.user.permission + ")");
        return next();

    };
};