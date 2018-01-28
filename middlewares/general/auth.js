module.exports = function (objectrepository) {

    return function (req, res, next) {

        console.log( req.session );
        console.log( req.isAuthenticated() );

        return next();

    };

};