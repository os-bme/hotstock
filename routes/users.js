var express = require('express');
var router = express.Router();

var renderMW = require('../middlewares/general/render');
var updateUser = require('../middlewares/user/updateUser');

var UserModel = require('../models/users');

var objectRepository = {
    userModel: UserModel
};

/* GET users listing. */
router.use('/user/all',
    renderMW(objectRepository, 'userAll')
);

module.exports = router;
