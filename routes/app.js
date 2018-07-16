var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var findTenderbyIDMW = require('../middlewares/tender/findTenderbyId');
var findTenderPartsbyTenderIdMW = require('../middlewares/tender/findAllTenderPartsbyTenderId');

var findMyUserMW = require('../middlewares/user/findMyUserDatas');

var findAppbyIdMW = require('../middlewares/app/findAppbyId');
var findAllAppMW = require('../middlewares/app/findAllApp');
var createAppMW = require('../middlewares/app/createApp');
var deleteAppMW = require('../middlewares/app/deleteApp');

var findAllAppPartsByAppIdMW = require('../middlewares/app_part/findAllAppPartbyAppId');

var createAllAppPartMW = require('../middlewares/app_part/createAllAppParts');

var redirectMW = require('../middlewares/general/redirect');
var redirectToAppMW = require('../middlewares/general/redirectToApp');
var redirectPrevMW = require('../middlewares/general/redirectPrev');
var renderMW = require('../middlewares/general/render');

var UserModel = require('../models/users');
var NewsModel = require('../models/news');
var TenderModel = require('../models/tenders');
var TenderPartModel = require('../models/tender_parts');
var AppModel = require('../models/apps');
var AppPartModel = require('../models/app_parts');

var objectRepository = {
    appModel: AppModel,
    appPartModel: AppPartModel,
    userModel: UserModel,
    newsModel: NewsModel,
    tenderModel: TenderModel,
    tenderPartModel: TenderPartModel
};

router.get('/all',
    authAdminMW(objectRepository),
    findAllAppMW(objectRepository),
    renderMW(objectRepository, 'appList')
);

router.get('/unscored',
    authAdminMW(objectRepository),
    renderMW(objectRepository, 'appList')
);

router.get('/add/:id',
    authUserMW(objectRepository),
    findTenderbyIDMW(objectRepository),
    findTenderPartsbyTenderIdMW(objectRepository),
    renderMW(objectRepository, 'appAdd')
);

router.post('/add/:id',
    authUserMW(objectRepository),
    findTenderbyIDMW(objectRepository),
    findTenderPartsbyTenderIdMW(objectRepository),
    findMyUserMW(objectRepository),
    createAppMW(objectRepository),
    createAllAppPartMW(objectRepository),
    redirectToAppMW(objectRepository)
);


//TODO: Delete AppParts too
router.post('/:id/del',
    authSuperAdminMW(objectRepository),
    findAppbyIdMW(objectRepository),
    deleteAppMW(objectRepository),
    redirectMW(objectRepository, "tender/active")
);

router.post('/:id/mod',
    authAdminMW(objectRepository),
    renderMW(objectRepository, 'app')
);

/* GET app */
router.get('/:id',
    authUserMW(objectRepository),
    findAppbyIdMW(objectRepository),
    findAllAppPartsByAppIdMW(objectRepository),
    renderMW(objectRepository, 'app')
);

module.exports = router;