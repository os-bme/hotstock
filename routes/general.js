var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var renderMW = require('../middlewares/general/render');

var UserModel = require('../models/users');
var NewsModel = require('../models/news');

var objectRepository = {
    userModel: UserModel,
    newsModel: NewsModel
};

router.get('/',
    function (req,res,next) {

        res.tpl.newses = [];

        var news = {
            _id: 0,
            title: 'Title',
            short_description: 'This is a news card with its short version of the full article, the full content.',
            publish_datetime: '2018-01-01'
        };
        res.tpl.newses.push(news);

        return next();
    },
    renderMW(objectRepository, 'index')
);

router.get('/about',
    renderMW(objectRepository, 'about')
);

router.use('/tag/:id/mod',
    authAdminMW(objectRepository),
    renderMW(objectRepository, 'tagList')
);

router.use('/tag/:id/del',
    authSuperAdminMW(objectRepository),
    renderMW(objectRepository, 'tagList')
);

router.use('/tag',
    authAdminMW(objectRepository),
    function (req,res,next) {
        res.tpl.tags = [];

        var tag = {
            _id: 0,
            fullname: 'Bachelor of Science',
            shortname: 'BSc'
        };
        res.tpl.tags.push(tag);

        var tag = {
            _id: 1,
            fullname: 'Bachelor of Science',
            shortname: 'BSc'
        };
        res.tpl.tags.push(tag);

        var tag = {
            _id: 2,
            fullname: 'Bachelor of Science',
            shortname: 'BSc'
        };
        res.tpl.tags.push(tag);

        return next();
    },
    renderMW(objectRepository, 'tagList')
);

module.exports = router;