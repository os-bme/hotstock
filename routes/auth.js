var express = require('express');
var router = express.Router();
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

router.use('/err', function (req, res) {
        res.status(404).send(error);
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
                res.tpl.user.email = req.user.email;
                res.tpl.user.roomNumber = req.user.roomNumber;
                //res.tpl.user.avatar = 'default.jpg';
                res.tpl.user.post_type = 'user';
                res.tpl.user.permission = 0;

                res.tpl.user.save(function (err) {
                    if (err !== null) {
                        console.log('new user save failure');
                        res.redirect('/auth/err');
                    } else {
                        console.log('new user save success');
                        res.redirect('/');
                    }
                });
            } else {
                console.log('user found in db');
                res.tpl.user = obj;
                res.redirect('/');
            }
        });

    }
);

module.exports = router;