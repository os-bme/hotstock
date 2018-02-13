module.exports = function (objectrepository) {

    return function (req, res, next) {
        var url = req.originalUrl.split("/");
        res.redirect( '/' + url[1] + '/' + url[2] );
    };

};