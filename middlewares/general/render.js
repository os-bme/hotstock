module.exports = function (objectrepository, viewname) {

    return function (req, res, next) {
        res.tpl.func.logger.info("Rendering " + viewname);
        res.render(viewname, {req: req, res: res});
    };

};