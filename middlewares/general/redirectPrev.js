module.exports = function (objectrepository) {

    return function (req, res, next) {
        var url = req.originalUrl.split("/");
        res.tpl.func.logger.info("Redirect to \'/" + url[1] + "/" + url[2] +"\'");
        res.redirect( '/' + url[1] + '/' + url[2] );
    };

};