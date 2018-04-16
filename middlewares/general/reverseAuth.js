module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            return next();
        }
    };

};