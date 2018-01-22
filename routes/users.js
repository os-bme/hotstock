
var updateUser = require('../middlewares/user/updateUser');
var UserModel = require('../models/users');

module.exports = function (app) {

    var objectRepository = {
        userModel: UserModel
    };

    /* GET users listing. */
    app.use('/user/all',
        function(req, res, next) {
            return res.send('respond with a resource');
        }
    );

};
