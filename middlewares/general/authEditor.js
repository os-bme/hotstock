module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ( !req.isAuthenticated() || !req.session.passport || req.session.passport.user.permission < 1) {

            var userID = res.tpl.func.userID(req) ;

            res.tpl.func.logger.warn("Unauthorized user - Access denied to Editor function ( IP: " + res.tpl.func.reqIP(req) + " )");
            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }

        return next();

    };
};