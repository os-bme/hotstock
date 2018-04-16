module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.aggregate(
            {
                $match:
                    { _user: res.tpl.user._id }
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
                res.tpl.error.push(err);
                console.log("Apps find: error");
            } else {
                res.tpl.apps = obj;
                console.log("Apps find: success");
            }
            return next();
        } );

    }

};