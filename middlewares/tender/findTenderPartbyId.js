var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectRepository) {

    return function (req, res, next) {

        console.log( "part id : " + req.params.partId );

        objectRepository.tenderPartModel.findOne(
            {
                _id: ObjectId(req.params.partId)
            },
            function (err, obj) {

                if (err != null) {
                    res.tpl.error.add(err);
                    console.log("Find Tender Part by ID: error");
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