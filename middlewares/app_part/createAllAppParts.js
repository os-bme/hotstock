var AppPartModel = require('../../models/app_parts');

module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.appParts = [];

        res.tpl.tenderParts.forEach(function (tenderPart) {

            if (req.body[tenderPart._id] == undefined) {
                req.body[tenderPart._id] = '';
            }

            if (req.body[tenderPart._id] == '' && tenderPart.required) {
                    var err = new Error('Missing required field');
                    err.status = 400;
                    return next(err);
            }

            res.tpl.appPart = new objectrepository.appPartModel();

            res.tpl.appPart._tender_part = tenderPart._id;
            res.tpl.appPart._app = res.tpl.app._id;
            res.tpl.appPart.content = req.body[tenderPart._id];
            res.tpl.appPart.status = 0;

            res.tpl.appParts.push(res.tpl.appPart);

        });

        console.log(AppPartModel.type);

        AppPartModel.insertMany(res.tpl.appParts,
            function (err) {

                if (err != null) {
                    res.tpl.error.push(err);
                    console.log("App Parts update: error");
                } else {
                    req.originalUrl = req.originalUrl.replace("/tender/new", "/tender/" + res.tpl.tender._id);
                    console.log("App Parts update: success");
                    return next();
                }
        });

    }

};