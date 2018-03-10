module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ( !req.isAuthenticated() || !req.session.passport || req.session.passport.user.permission < 2 ) {
            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }

        return next();

    };
};