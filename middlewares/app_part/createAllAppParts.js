var AppPartModel = require('../../models/app_parts');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        res.tpl.appParts = [];
        res.tpl.tenderParts.forEach(copyDataIfNotNull(req, res, next));
        AppPartModel.insertMany(res.tpl.appParts, appPartInsertionCallback(req, res, next));
    };

    function copyDataIfNotNull(req, res, next) {
        return function (tenderPart) {
            if (isAppPartNull(req, tenderPart)) {
                if (tenderPart.required) {
                    return createMissingFieldError(next);
                }
            } else {
                copyAppPartData(req, res, tenderPart);
            }
        }
    }

    function isAppPartNull(req, tenderPart) {
        return req.body[tenderPart._id] === undefined || req.body[tenderPart._id] === null || req.body[tenderPart._id] === '';
    }

    function createMissingFieldError(next) {
        var err = new Error('Missing required field');
        err.status = 400;
        return next(err);
    }

    function copyAppPartData(req, res, tenderPart) {
        res.tpl.appPart = new objectRepository.appPartModel();

        res.tpl.appPart._tender_part = tenderPart._id;
        res.tpl.appPart._app = res.tpl.app._id;
        res.tpl.appPart.content = req.body[tenderPart._id];
        res.tpl.appPart.status = 0;

        res.tpl.appParts.push(res.tpl.appPart);
    }

    function appPartInsertionCallback(req, res, next) {
        return function (err) {
            if (err !== null) {
                res.tpl.error.push(err);
                console.log("App Parts update: error");
                return next(err)
            }

            req.originalUrl = req.originalUrl.replace("/tender/new", "/tender/" + res.tpl.tender._id);
            console.log("App Parts update: success");
            return next();
        }
    }
};