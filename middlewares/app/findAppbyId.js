var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.aggregate(
            {
                $match:
                    { _id : ObjectId(req.params.id) }
            },
            {
                $lookup:
                    {
                        from: 'users',
                        localField: '_user',
                        foreignField: '_id',
                        as: 'user'
                    }
            },
            { $unwind: '$user' },
            {
                $lookup:
                    {
                        from: 'tenders',
                        localField: '_tender',
                        foreignField: '_id',
                        as: 'tender'
                    }
            },
            { $unwind: '$tender' },
            function (err, obj) {

            if (err != null){
                res.tpl.error.add(err);
                console.log("App find: error");
            } else {
                res.tpl.app = obj[0];
                console.log("App find: success");
            }

            return next();

        } );

    }
};