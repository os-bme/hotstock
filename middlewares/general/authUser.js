module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ( !req.isAuthenticated() ) {

            var userID = res.tpl.func.userID(req) ;

            res.tpl.func.logger.warn("Unauthorized user - Access denied to User function ( IP: " + res.tpl.func.reqIP(req) + " )");
            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }

        return next();

    };
};