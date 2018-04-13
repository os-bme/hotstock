var ObjectId = require('../../db').Types.ObjectId;

module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.userModel.findOne(
            {
                _id: ObjectId(req.session.passport.user._id)
            },
            function (err, obj) {

                if (err != null) {
                    res.tpl.error.push(err);
                    console.log("Find user by id: error");
                } else {
                    res.tpl.user = obj;
                    console.log("Find user by id:  success");
                }
                return next();
            }
        );

    }
};