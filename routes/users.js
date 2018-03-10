var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var redirectMW = require('../middlewares/general/redirect');
var renderMW = require('../middlewares/general/render');

var UserModel = require('../models/users');

var objectRepository = {
    userModel: UserModel
};

/* GET users listing. */
router.get('/all',
    authAdminMW(objectRepository),
    function (req, res, next) {
        res.tpl.users = [];

        var user = {
            _id: 0,
            name: 'Kiss Béla',
            fullname: 'Kiss Béla',
            email: 'kiss.bela@bme.hu',
            bme_id: 'asdlol',
            permission: 0
        };
        res.tpl.users.push(user);

        var user = {
            _id: 1,
            name: 'Kiss Béla',
            fullname: 'Közép Béla',
            email: 'kiss.bela@bme.hu',
            bme_id: 'asdlol',
            permission: 1
        };
        res.tpl.users.push(user);

        var user = {
            _id: 2,
            name: 'Kiss Béla',
            fullname: 'Nagy Béla',
            email: 'kiss.bela@bme.hu',
            bme_id: 'asdlol',
            permission: 2
        };
        res.tpl.users.push(user);

        return next();
    },
    renderMW(objectRepository, 'userList')
);

/* GET user's apps */
router.get('/:id/apps',
    authUserMW(objectRepository),
    function (req, res, next) {
        res.tpl.user = {
            _id: 0,
            fullname: 'Kiss Béla',
            neptun: 'ABCDEF',
            email: 'kiss.bela@bme.hu',
            bme_id: 'asdlol',
            permission: 0,
            ownSearch: true
        };

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

router.post('/:id/del',
    authSuperAdminMW(objectRepository),
    redirectMW(objectRepository)
);

router.post('/:id/mod',
    authAdminMW(objectRepository),
    redirectMW(objectRepository)
);

router.post('/:id/img',
    authSuperAdminMW(objectRepository),
    redirectMW(objectRepository)
);

router.post('/:id/permission',
    authSuperAdminMW(objectRepository),
    redirectMW(objectRepository)
);

/* GET user's profile */
router.get('/:id',
    authUserMW(objectRepository),
    function (req, res, next) {
        res.tpl.user = {
            _id: 0,
            fullname: 'Kiss Béla',
            firstname: 'Kiss',
            lastname: 'Béla',
            email: 'kiss.bela@bme.hu',
            bme_id: 'asdlol',
            permission: 0,
            notification: true
        };
        return next();
    },
    renderMW(objectRepository, 'profile')
);

module.exports = router;
