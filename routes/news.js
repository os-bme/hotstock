var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var findNewsByIdMW = require('../middlewares/news/findNewsbyId');
var findAllNewsMW = require('../middlewares/news/findAllNews');
var updateNewsMW = require('../middlewares/news/updateNews');

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
    findNewsByIdMW(objectRepository, 'mod'),
    updateNewsMW(objectRepository),
    redirectPrevMW(objectRepository)
);

router.post('/:id/del',
    authSuperAdminMW(objectRepository),
    // TODO delete news
    redirectMW(objectRepository, "news/all")
);

/* GET news */
router.get('/:id',
    findNewsByIdMW(objectRepository, 'list'),
    renderMW(objectRepository, 'news')
);

module.exports = router;