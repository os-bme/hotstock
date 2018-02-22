module.exports = function (objectrepository, method) {

    return function (req, res, next) {

        if (method === 'all') {
            objectrepository.tenderModel.find({}, function (err, obj) {

                if (res.tpl.tenders === null) {
                    res.tpl.tenders = null;
                    console.log("Find all tender: error/none");
                } else {
                    res.tpl.tenders = obj;
                    console.log("Find all tender: success");
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

                    if (obj === null) {
                        res.tpl.tenders = null;
                        console.log("Find all tender: error/none");
                    } else {
                        res.tpl.tenders = obj;
                        console.log("Find all tender: success");
                    }

                    return next();
                }
            );
        }

    }
};