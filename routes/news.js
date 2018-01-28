var express = require('express');
var router = express.Router();

var renderMW = require('../middlewares/general/render');
var updateUser = require('../middlewares/user/updateUser');

var UserModel = require('../models/users');
var NewsModel = require('../models/news');

var objectRepository = {
    userModel: UserModel,
    newsModel: NewsModel
};

router.use('/all',
    function (req,res,next) {

        res.newses = [];

        var news = new NewsModel();
        news = {
            _id: 0,
            title: 'Title',
            short_description: 'This is a news card with its short version of the full article, the full content.',
            publish_datetime: '2018-01-01'
        };
        res.newses.push(news);

        var news = new NewsModel();
        news = {
            _id: 1,
            title: 'Title',
            short_description: 'This is a news card with its short version of the full article, the full content.',
            publish_datetime: '2018-01-01'
        };
        res.newses.push(news);

        var news = new NewsModel();
        news = {
            _id: 2,
            title: 'Title',
            short_description: 'This is a news card with its short version of the full article, the full content.',
            publish_datetime: '2018-01-01'
        };
        res.newses.push(news);

        var news = new NewsModel();
        news = {
            _id: 3,
            title: 'Title',
            short_description: 'This is a news card with its short version of the full article, the full content.',
            publish_datetime: '2018-01-01'
        };
        res.newses.push(news);

        return next();
    },
    renderMW(objectRepository, 'newsAll')
);

module.exports = router;