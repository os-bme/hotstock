module.exports = function (objectrepository, viewname) {

    return function (req, res, next) {
        res.render(viewname, {req: req, res: res});
    };

};