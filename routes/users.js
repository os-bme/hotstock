var express = require('express');
var router = express.Router();

var renderMW = require('../middlewares/general/render');

var updateUser = require('../middlewares/user/updateUser');
var authUserMW = require('../middlewares/general/authUser');

var UserModel = require('../models/users');

var objectRepository = {
    userModel: UserModel
};

/* GET users listing. */
router.use('/all',
    renderMW(objectRepository, 'userList')
);

/* GET user's profile */
router.use('/:id',
    authUserMW(objectRepository),
    function (req, res, next) {
        res.tpl.user = {
            _id: 0,
            name: 'Kiss Béla',
            firstname: 'Kiss',
            lastname: 'Béla',
            email: 'kiss.bela@bme.hu',
            bme_id: 'asdlol',
            permission: 0
        };
      return next();
    },
    renderMW(objectRepository, 'profile')
);

module.exports = router;
