var express = require('express');
var router = express.Router();

var reverseAuthMW = require('../middlewares/general/reverseAuth');

var findUserbyBMEIdMW = require('../middlewares/user/findUserbyBMEId');
var redirectMW = require('../middlewares/general/redirect');

var passport = require('passport');

var UserModel = require('../models/users');

var objectRepository = {
    userModel: UserModel
};

router.use('/login',
    passport.authenticate('oauth2'));

router.use('/logout', function (req, res) {
        res.tpl.func.logger.info("User logged out (userID: " + res.tpl.func.userID(req) + ")");
        req.logout();
        res.redirect('/');
    }
);

router.use('/err', function (req, res, next) {
        res.tpl.func.logger.error("User passport authentication failure");
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
    findUserbyBMEIdMW(objectRepository),
    function (req, res, next) {
        res.tpl.func.logger.info("User logged in (userID: " + res.tpl.func.userID(req) + ")");
        next();
    },
    redirectMW(objectRepository,'')
);

module.exports = router;