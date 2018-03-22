module.exports = function (objectrepository) {

    return function (req, res, next) {
        res.redirect( '/app/' + res.tpl.app._id );
    };

};