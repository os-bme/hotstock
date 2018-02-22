var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectRepository) {

    return function (req, res, next) {

        console.log( "part id : " + req.params.partId );

        objectRepository.tenderPartModel.findOne(
            {
                _id: ObjectId(req.params.partId)
            },
            function (err, obj) {
                if (obj === null) {
                    res.tpl.tenderPart = null;
                    console.log("Find Tender Part by ID: error/none");
                } else {
                    res.tpl.tenderPart = obj;
                    console.log( res.tpl.tenderPart );
                    console.log("Find Tender Part by ID: success");
                }
                return next();
            }
        );

    }
};