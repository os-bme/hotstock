
var updateUser = require('../middlewares/user/updateUser');
var UserModel = require('../models/users');

module.exports = function (app) {

    var objectRepository = {
        userModel: UserModel
    };

    /* GET home page. */
    app.use('/',
        function (req, res, next) {
            return res.send('Main page');
        }
    );

};