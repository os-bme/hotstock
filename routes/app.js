var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var findTenderbyIDMW = require('../middlewares/tender/findTenderbyId');
var findTenderPartsbyTenderIdMW = require('../middlewares/tender/findAllTenderPartsbyTenderId');

var findMyUserMW = require('../middlewares/user/findMyUserDatas');

var renderMW = require('../middlewares/general/render');

var UserModel = require('../models/users');
var NewsModel = require('../models/news');
var TenderModel = require('../models/tenders');
var TenderPartModel = require('../models/tender_parts');

var objectRepository = {
    userModel: UserModel,
    newsModel: NewsModel,
    tenderModel: TenderModel,
    tenderPartModel: TenderPartModel
};

router.get('/all',
    authAdminMW(objectRepository),
    function (req,res,next) {
        res.tpl.apps = [];

        var app = {
            _id: 0,
            title: 'one',
            user: {
                name: 'Béla'
            },
            register_date: '2018.01.01.',
            final_score: ''
        };
        res.tpl.apps.push(app);

        var app = {
            _id: 1,
            title: 'two',
            user: {
                name: 'Béla'
            },
            register_date: '2018.01.01.',
            final_score: ''
        };
        res.tpl.apps.push(app);

        var app = {
            _id: 2,
            title: 'three',
            user: {
                name: 'Béla'
            },
            register_date: '2018.01.01.',
            final_score: ''
        };
        res.tpl.apps.push(app);

        return next();
    },
    renderMW(objectRepository, 'appList')
);

router.get('/unscored',
    authAdminMW(objectRepository),
    renderMW(objectRepository, 'appList')
);

router.get('/add/:id',
    authUserMW(objectRepository),
    findTenderbyIDMW(objectRepository, 'mod'),
    findTenderPartsbyTenderIdMW(objectRepository),
    findMyUserMW(objectRepository),
    renderMW(objectRepository, 'appAdd')
);

router.use('/:id/del',
    authSuperAdminMW(objectRepository),
    renderMW(objectRepository, 'app')
);

router.use('/:id/mod',
    authAdminMW(objectRepository),
    renderMW(objectRepository, 'app')
);

/* GET app */
router.use('/:id',
    authUserMW(objectRepository),
    function (req, res, next) {
        res.tpl.tender = {
            _id: 0,
            title: 'One'
        };
        res.tpl.user = {
            _id: 1,
            bme_id: 555555,
            name: 'Kiss Béla',
            fullname: 'Kiss Béla'
        };
        res.tpl.app = {
            _id: 2,
            status: 0,
            final_score: '',
            _tender: 0,
            _user: 1
        };
        res.tpl.tender_parts = [];
        var tender_part = {
            _id: 3,
            title: 'Családi állapot',
            description: 'Egyedülálló / Házas / ...',
            type: 0,
            scorable: false,
            _tender: 0
        };
        res.tpl.tender_parts.push(tender_part);
        var tender_part = {
            _id: 4,
            title: 'Gyerekek',
            description: 'egész szám',
            type: 0,
            scorable: true,
            _tender: 0
        };
        res.tpl.tender_parts.push(tender_part);

        res.tpl.app_parts = [];
        var app_part = {
            content: 'Házas',
            score: '',
            _app: 2,
            _tender_part: 3
        };
        res.tpl.app_parts.push(app_part);
        var app_part = {
            content: '21',
            score: 5,
            _app: 2,
            _tender_part: 4
        };
        res.tpl.app_parts.push(app_part);
        return next();
    },
    renderMW(objectRepository, 'app')
);

module.exports = router;