var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectRepository) {

    return function (req, res, next) {

        objectRepository.tenderPartModel.aggregate(
            {
                $match:
                    {
                        _tender: ObjectId(req.params.id)
                    }
            },
            function (err, obj) {
                if (obj === null) {
                    res.tpl.tenderParts = null;
                    console.log("Find Tender Part by Tender ID: error/none");
                } else {
                    res.tpl.tenderParts = obj;
                    console.log("Find Tender Part by Tender ID: success");
                }
                return next();
            }
        );

    }
};