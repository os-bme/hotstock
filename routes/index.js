var express = require('express');
var router = express.Router();

var updateUser = require('../middlewares/user/updateUser');
var UserModel = require('../models/users');

var objectRepository = {
    userModel: UserModel
};

router.use('/',
    function (req, res, next) {
        return res.send('Main page');
    }
);

module.exports = router;