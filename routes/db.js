var express = require('express');
var router = express.Router();

var updateUserMW = require('../middlewares/user/updateUserDatas');
var deleteUserMW = require('../middlewares/user/deleteUser');
var findUserByBMEIdMW = require('../middlewares/user/findUserbyId');

var updateNewsMW = require('../middlewares/news/updateNews');
var deleteNewsMW = require('../middlewares/news/deleteNews');
var findNewsByIdMW = require('../middlewares/news/findNewsbyId');

var updateTenderMW = require('../middlewares/tender/updateTender');
var deleteTenderMW = require('../middlewares/tender/deleteTender');
var findTenderByIdMW = require('../middlewares/tender/findTenderbyId');

var updateAppMW = require('../middlewares/app/updateApp');
var deleteAppMW = require('../middlewares/app/deleteApp');
var findAppByIdMW = require('../middlewares/app/findAllAppbyId');

var updateEvaMW = require('../middlewares/eva/updateEva');
var deleteEvaMW = require('../middlewares/eva/deleteEva');
var findEvaMW = require('../middlewares/eva/findEva');

var UserModel = require('../models/users');
var NewsModel = require('../models/news');
var TenderModel = require('../models/tenders');
var AppModel = require('../models/apps');
var EvaModel = require('../models/evaluators');

var objectRepository = {
    userModel: UserModel,
    newsModel: NewsModel,
    tenderModel: TenderModel,
    appModel: AppModel,
    evaModel: EvaModel
};

/* GET Test User Schema */
router.use('/user/test',
    function (req, res, next) {
        res.tpl.user = new objectRepository.userModel();
        res.tpl.user.name = "Test Elek";
        res.tpl.user.bme_id = 1234;
        res.tpl.user.email = "valami@proba.hu";
        res.tpl.user.post_type = "user";
        return next();
    },
    updateUserMW(objectRepository),
    findUserByBMEIdMW(objectRepository),
    deleteUserMW(objectRepository),
    function (req, res, next) {
        return res.send('User schema tested');
    }
);

/* GET Test News Schema */
router.use('/news/test',
    function (req, res, next) {
        res.tpl.news = new objectRepository.newsModel();
        req.body.title = "Test title";
        req.body.short_description = "Test short description";
        req.body.long_description = "Test long description";
        return next();
    },
    updateNewsMW(objectRepository),
    findNewsByIdMW(objectRepository),
    deleteNewsMW(objectRepository),
    function (req, res, next) {
        return res.send('News schema tested');
    }
);

/* GET Test Tender Schema */
router.use('/tender/test',
    function (req, res, next) {
        res.tpl.tender = new objectRepository.tenderModel();
        res.tpl.tender.name = "Próba pályázat";
        res.tpl.tender.start_datetme = new Date("2016-01-01");
        res.tpl.tender.end_datetime = new Date("2019-01-01");
        res.tpl.tender.datasheet_template = "Sablon";
        return next();
    },
    updateTenderMW(objectRepository),
    findTenderByIdMW(objectRepository),
    deleteTenderMW(objectRepository),
    function (req, res, next) {
        return res.send('Tender schema tested');
    }
);

/* GET Test App Schema */
router.use('/app/test',
    function (req, res, next) {
        res.tpl.tender = new objectRepository.tenderModel();
        res.tpl.tender.name = "Próba pályázat";
        res.tpl.tender.start_datetme = new Date("2016-01-01");
        res.tpl.tender.end_datetime = new Date("2019-01-01");
        res.tpl.tender.datasheet_template = "Sablon";
        return next();
    },
    function (req, res, next) {
        res.tpl.user = new objectRepository.userModel();
        res.tpl.user.name = "Test Elek";
        res.tpl.user.bme_id = 1234;
        res.tpl.user.email = "valami@proba.hu";
        res.tpl.user.post_type = "user";
        return next();
    },

    updateUserMW(objectRepository),
    updateTenderMW(objectRepository),

    function (req, res, next) {
        res.tpl.app = new objectRepository.appModel();
        res.tpl.app._tender = res.tpl.tender;
        res.tpl.app._user = res.tpl.user;
        res.tpl.app.register_datetime = new Date(Date.now());
        return next();
    },

    updateAppMW(objectRepository),
    findAppByIdMW(objectRepository),

    deleteAppMW(objectRepository),
    deleteUserMW(objectRepository),
    deleteTenderMW(objectRepository),

    function (req, res, next) {
        return res.send('App schema tested');
    }
);

/* GET Test Evaulator Schema */
router.use('/eva/test',
    function (req, res, next) {
        res.tpl.tender = new objectRepository.tenderModel();
        res.tpl.tender.name = "Próba pályázat";
        res.tpl.tender.start_datetme = new Date("2016-01-01");
        res.tpl.tender.end_datetime = new Date("2019-01-01");
        res.tpl.tender.datasheet_template = "Sablon";
        return next();
    },
    function (req, res, next) {
        res.tpl.user = new objectRepository.userModel();
        res.tpl.user.name = "Test Elek";
        res.tpl.user.bme_id = 1234;
        res.tpl.user.email = "valami@proba.hu";
        res.tpl.user.post_type = "user";
        return next();
    },

    updateUserMW(objectRepository),
    updateTenderMW(objectRepository),

    function (req, res, next) {
        res.tpl.eva = new objectRepository.evaModel();
        res.tpl.eva._tender = res.tpl.tender;
        res.tpl.eva._user = res.tpl.user;
        res.tpl.eva.permission = 100;
        return next();
    },

    updateEvaMW(objectRepository),
    findEvaMW(objectRepository),

    deleteEvaMW(objectRepository),
    deleteUserMW(objectRepository),
    deleteTenderMW(objectRepository),

    function (req, res, next) {
        return res.send('Eva schema tested');
    }
);

/* GET Database admin home page. */
router.use('/',
    function (req, res, next) {
        return res.send('Database admin home page');
    }
);

module.exports = router;