var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var findAllTenderMW = require('../middlewares/tender/findAllTender');
var findTenderByIdMW = require('../middlewares/tender/findTenderbyId');
var updateTenderMW = require('../middlewares/tender/updateTender');
var deleteTenderMW = require('../middlewares/tender/deleteTender');

var redirectPrevMW = require('../middlewares/general/redirectPrev');
var renderMW = require('../middlewares/general/render');
var redirectMW = require('../middlewares/general/redirect');

var UserModel = require('../models/users');
var TenderModel = require('../models/tenders');

var objectRepository = {
    userModel: UserModel,
    tenderModel: TenderModel
};

router.get('/active',
    findAllTenderMW(objectRepository, 'active'),
    renderMW(objectRepository, 'tenderList')
);

router.get('/all',
    authAdminMW(objectRepository),
    findAllTenderMW(objectRepository, 'all'),
    renderMW(objectRepository, 'tenderList')
);

router.get('/add',
    authEditorMW(objectRepository),
    renderMW(objectRepository, 'tenderAdd')
);

router.post('/:id/del',
    authSuperAdminMW(objectRepository),
    findTenderByIdMW(objectRepository, 'mod'),
    deleteTenderMW(objectRepository),
    redirectMW(objectRepository, "tender/all")
);

router.post('/:id/mod',
    authEditorMW(objectRepository),
    findTenderByIdMW(objectRepository, 'mod'),
    updateTenderMW(objectRepository),
    redirectPrevMW(objectRepository)
);

router.get('/:id/app',
    authAdminMW(objectRepository),
    renderMW(objectRepository, 'appList')
);

router.get('/:id',
    findTenderByIdMW(objectRepository, 'list'),
    renderMW(objectRepository, 'tender')
);

module.exports = router;