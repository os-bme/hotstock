
var updateUser = require('../middlewares/user/updateUser');

var UserModel = require('../models/users');

module.exports = function (app) {

    var objectRepository = {
        userModel: UserModel
    };

    /* GET home page. */
    app.use('/',
        updateUser(objectRepository),
        function (req, res, next) {
            res.send('Test user Created');
            return;
        }
    );

}