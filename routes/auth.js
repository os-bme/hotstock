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

router.use('/oauth/callback',
    function (req, res, next) {
        if (req.isAuthenticated()) {

            res.redirect('/');
        } else {
            return next();
        }
    },
    passport.authenticate('oauth2', {
        failureRedirect: '/auth/example'
    }),
    function (req, res) {
        console.log(req.user);
        // Sikeres azonositas
        if (objectRepository.userModel.findOne({bme_id: req.user.internal_id}) === null) {
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
                    res.status(404).send(error);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    }
);

module.exports = router;