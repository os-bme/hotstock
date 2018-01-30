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
    renderMW(objectRepository, 'newsList')
);

router.use('/:id',
    function (req, res, next) {
        res.news = {
            _id: 0,
            title: 'Title',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur non augue et nisi porttitor pretium. Mauris vel neque vitae orci luctus aliquet. Nulla facilisi. Donec in mi. Curabitur semper massa quis diam. Ut dignissim elit at nisi. Mauris nec ipsum. Nunc ac quam. Donec in diam. Phasellus tempus scelerisque justo.',
            publish_datetime: '2018-01-01',
            publisher: {
                name: 'Béla'
            }
        };
        next();
    },
    renderMW(objectRepository, 'news')
);

module.exports = router;