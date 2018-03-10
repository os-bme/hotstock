var express = require('express');
var router = express.Router();

var updateUserMW = require('../middlewares/user/updateUser');
var deleteUserMW = require('../middlewares/user/deleteUser');
var findUserbyBMEIdMW = require('../middlewares/user/findUserbyId');

var updateTenderMW = require('../middlewares/tender/updateTender');
var deleteTenderMW = require('../middlewares/tender/deleteTender');
var findTenderbyIdMW = require('../middlewares/tender/findTenderbyId');

var updateAppMW = require('../middlewares/app/updateApp');
var deleteAppMW = require('../middlewares/app/deleteApp');
var findAppbyIdMW = require('../middlewares/app/findAllAppbyId');

var updateEvaMW = require('../middlewares/eva/updateEva');
var deleteEvaMW = require('../middlewares/eva/deleteEva');
var findEvaMW = require('../middlewares/eva/findEva');

var UserModel = require('../models/users');
var TenderModel = require('../models/tenders');
var AppModel = require('../models/apps');
var EvaModel = require('../models/evaluators');

var objectRepository = {
    userModel: UserModel,
    tenderModel: TenderModel,
    appModel: AppModel,
    evaModel: EvaModel
};

/* GET Test User Schema */
router.use('/db/user/test',
    function (req, res, next) {
        res.tpl.user = new objectRepository.userModel();
        res.tpl.user.name = "Test Elek";
        res.tpl.user.bme_id = 1234;
        res.tpl.user.email = "valami@proba.hu";
        res.tpl.user.post_type = "user";
        return next();
    },
    updateUserMW(objectRepository),
    findUserbyBMEIdMW(objectRepository),
    deleteUserMW(objectRepository),
    function (req, res, next) {
        return res.send('User schema tested');
    }
);

/* GET Test Tender Schema */
router.use('/db/tender/test',
    function (req, res, next) {
        res.tpl.tender = new objectRepository.tenderModel();
        res.tpl.tender.name = "Próba pályázat";
        res.tpl.tender.start_datetme = new Date("2016-01-01");
        res.tpl.tender.end_datetime = new Date("2019-01-01");
        res.tpl.tender.datasheet_template = "Sablon";
        return next();
    },
    updateTenderMW(objectRepository),
    findTenderbyIdMW(objectRepository),
    deleteTenderMW(objectRepository),
    function (req, res, next) {
        return res.send('Tender schema tested');
    }
);

/* GET Test App Schema */
router.use('/db/app/test',
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
    findAppbyIdMW(objectRepository),

    deleteAppMW(objectRepository),
    deleteUserMW(objectRepository),
    deleteTenderMW(objectRepository),

    function (req, res, next) {
        return res.send('App schema tested');
    }
);

/* GET Test Evaulator Schema */
router.use('/db/eva/test',
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
router.use('/db',
    function (req, res, next) {
        return res.send('Database admin home page');
    }
);

module.exports = router;