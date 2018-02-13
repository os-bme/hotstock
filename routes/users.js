var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var permissionSelfOrSuperadminMW = require('../middlewares/general/permissionSelfOrSuperadmin');

var deleteUserMW = require('../middlewares/user/deleteUser');
var findUserByIdMW = require('../middlewares/user/findUserbyId');
var findAllUserMW = require('../middlewares/user/findAllUser');
var updateUserDatasMW = require('../middlewares/user/updateUserDatas');
var updateUserPermissionMW = require('../middlewares/user/updateUserPersmission');

var redirectPrevMW = require('../middlewares/general/redirectPrev');
var redirectMW = require('../middlewares/general/redirect');
var renderMW = require('../middlewares/general/render');

var UserModel = require('../models/users');

var objectRepository = {
    userModel: UserModel
};

/* GET users listing. */
router.get('/all',
    authAdminMW(objectRepository),
    findAllUserMW(objectRepository),
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

/* POST delete user */
router.post('/:id/del',
    authSuperAdminMW(objectRepository),
    findUserByIdMW(objectRepository),
    deleteUserMW(objectRepository),
    redirectMW(objectRepository, "user")
);

/* POST user data update */
router.post('/:id/mod',
    authUserMW(objectRepository),
    permissionSelfOrSuperadminMW(objectRepository),
    findUserByIdMW(objectRepository),
    updateUserDatasMW(objectRepository),
    redirectPrevMW(objectRepository)
);

router.post('/:id/img',
    authSuperAdminMW(objectRepository),
    redirectPrevMW(objectRepository)
);

/* POST user permission update */
router.post('/:id/permission',
    authSuperAdminMW(objectRepository),
    findUserByIdMW(objectRepository),
    updateUserPermissionMW(objectRepository),
    redirectPrevMW(objectRepository)
);

/* GET user's profile */
router.get('/:id',
    authUserMW(objectRepository),
    permissionSelfOrSuperadminMW(objectRepository),
    findUserByIdMW(objectRepository),
    renderMW(objectRepository, 'profile')
);

module.exports = router;
