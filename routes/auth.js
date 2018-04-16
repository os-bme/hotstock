var express = require('express');
var router = express.Router();

var reverseAuthMW = require('../middlewares/general/reverseAuth');

var findUserbyBMEIdMW = require('../middlewares/user/findUserbyBMEId');

var passport = require('passport');

var UserModel = require('../models/users');

var objectRepository = {
    userModel: UserModel
};

router.use('/login',
    passport.authenticate('oauth2'));

router.use('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    }
);

router.use('/err', function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
);

router.use('/oauth/callback',
    reverseAuthMW(objectRepository),
    passport.authenticate('oauth2', {
        failureRedirect: '/err'
    }),
    findUserbyBMEIdMW(objectRepository)
);

module.exports = router;