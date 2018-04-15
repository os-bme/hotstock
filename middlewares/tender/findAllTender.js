module.exports = function (objectrepository, method) {

    return function (req, res, next) {

        if (method === 'all') {
            objectrepository.tenderModel
                .find({})
                .exec(function (err, obj) {
                    if (err != null) {
                        res.tpl.error.add(err);
                        res.tpl.func.logger.error("Tender listing failure " + err);
                    } else {
                        res.tpl.tenders = obj;
                        res.tpl.func.logger.info("Tender listing success ( size: " + obj.length + " )");
                    }
                    return next();
                });
        }

        if (method === 'active') {
            objectrepository.tenderModel.find(
                {
                    $and:
                        [
                            {end_datetime: {$gte: Date.now()}},
                            {start_datetime: {$lte: Date.now()}}
                        ]
                },
                function (err, obj) {
                    if (err != null) {
                        res.tpl.error.add(err);
                        res.tpl.func.logger.error("Tender (active) listing failure " + err);
                    } else {
                        res.tpl.tenders = obj;
                        res.tpl.func.logger.info("Tender (active) listing success ( size: " + obj.length + " )");
                    }
                    return next();
                }
            );
        }

    }
};