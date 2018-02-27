var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appPartModel.aggregate(
            {
                $match:
                    {
                        _app: ObjectId(res.tpl.app._id)
                    }
            },
            {
                $lookup:
                    {
                        from: 'tenderparts',
                        localField: '_tender_part',
                        foreignField: '_id',
                        as: 'tenderPart'
                    }
            },
            { $unwind: '$tenderPart' },
            function (err, obj) {

                if (err != null) {
                    res.tpl.error.add(err);
                    console.log("AppParts find: error");
                } else {
                    res.tpl.appParts = obj;
                    console.log("AppParts find: success");
                }

                return next();

            });

    }
};