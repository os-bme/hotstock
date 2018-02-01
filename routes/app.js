var express = require('express');
var router = express.Router();

var renderMW = require('../middlewares/general/render');
var authMW = require('../middlewares/general/authUser');
var updateUser = require('../middlewares/user/updateUser');

var UserModel = require('../models/users');
var NewsModel = require('../models/news');

var objectRepository = {
    userModel: UserModel,
    newsModel: NewsModel
};

router.get('/all',
    function (req,res,next) {
        res.tpl.apps = [];

        return next();
    },
    renderMW(objectRepository, 'appList')
);

router.get('/unscored',
    function (req,res,next) {
        return next();
    },
    renderMW(objectRepository, 'appList')
);

module.exports = router;