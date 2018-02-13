var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var renderMW = require('../middlewares/general/render');
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
    function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            return next();
        }
    },
    passport.authenticate('oauth2', {
        failureRedirect: '/err'
    }),
    function (req, res) {
        // Sikeres azonositas
        objectRepository.userModel.findOne({bme_id: req.user.internal_id}, function (err, obj) {
            if (obj === null) {
                res.tpl.user = new objectRepository.userModel();
                res.tpl.user.bme_id = req.user.internal_id;
                res.tpl.user.name = req.user.displayName;
                res.tpl.user.firstname = req.user.givenName;
                res.tpl.user.lastname = req.user.sn;
                res.tpl.user.email = req.user.mail;
                res.tpl.user.mobile = req.user.mobile;
                res.tpl.user.permission = 0;

                res.tpl.user.save(function (err) {
                    if (err !== null) {
                        console.log('Oauth callback: new user save failure');
                        res.redirect('/auth/err');
                    } else {
                        console.log('Oauth callback: new user save success');
                        req.session.passport.user = res.tpl.user;
                        res.redirect('/');
                    }
                });
            } else {
                console.log('Oauth callback: user found in db');
                res.tpl.user = obj;
                req.session.passport.user.permission = obj.permission;
                req.session.passport.user._id = obj._id;
                res.redirect('/');
            }
        });

    }
);

module.exports = router;