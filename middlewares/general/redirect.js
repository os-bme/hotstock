module.exports = function (objectrepository, url) {

    return function (req, res, next) {
        res.tpl.func.logger.info("Redirect to \'/" + url + "\'");
        return res.redirect( '/' + url );
    };

};