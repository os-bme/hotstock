module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ( !req.isAuthenticated() ) {
            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }

        return next();

    };
};