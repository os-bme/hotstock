var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var findNewsbyIdMW = require('../middlewares/news/findNewsbyId');
var findAllNewsMW = require('../middlewares/news/findAllNews');
var updateNewsMW = require('../middlewares/news/updateNews');
var deleteNewsMW = require('../middlewares/news/deleteNews');

var redirectPrevMW = require('../middlewares/general/redirectPrev');
var renderMW = require('../middlewares/general/render');
var redirectMW = require('../middlewares/general/redirect');

var UserModel = require('../models/users');
var NewsModel = require('../models/news');

var objectRepository = {
    userModel: UserModel,
    newsModel: NewsModel
};

/* GET news list */
router.get('/all',
    findAllNewsMW(objectRepository),
    renderMW(objectRepository, 'newsList')
);

/* GET news add */
router.get('/add',
    authEditorMW(objectRepository),
    renderMW(objectRepository, 'newsAdd')
);

/* POST update news */
router.post('/:id/mod',
    authEditorMW(objectRepository),
    findNewsbyIdMW(objectRepository, 'mod'),
    updateNewsMW(objectRepository),
    redirectPrevMW(objectRepository)
);

router.post('/:id/del',
    authSuperAdminMW(objectRepository),
    findNewsbyIdMW(objectRepository, 'mod'),
    deleteNewsMW(objectRepository),
    redirectMW(objectRepository, "news/all")
);

/* GET news */
router.get('/:id',
    findNewsbyIdMW(objectRepository, 'list'),
    renderMW(objectRepository, 'news')
);

module.exports = router;