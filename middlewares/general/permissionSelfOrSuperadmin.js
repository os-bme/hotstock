module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ( req.session.passport.user.permission !== 3 && req.params.id != req.session.passport.user._id ) {
            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }

        return next();

    };
};