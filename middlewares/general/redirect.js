module.exports = function (objectrepository, url) {

    return function (req, res, next) {
        res.redirect( '/' + url );
    };

};