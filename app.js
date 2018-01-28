var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var configuration = require('./config.json');

var passport = require('passport'),
    OAuth2Strategy = require('passport-oauth2');

var session = require('express-session');
var app = express();

/**
 *  View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 *  Cookie and body parser
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 *  Crate session
 */
app.use(session({
    secret: configuration.sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 *  OAuth2
 */
passport.use(new OAuth2Strategy({
        authorizationURL: 'https://auth.sch.bme.hu/site/login',
        tokenURL: 'https://auth.sch.bme.hu/oauth2/token',
        clientID: configuration.CLIENT_ID,
        clientSecret: configuration.CLIENT_SECRET,
        callbackURL: "/auth/oauth/callback",
        scope: configuration.SCOPE
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken + '\n' + refreshToken + '\n' + JSON.stringify(profile));
        var request = require('request');
        request('https://auth.sch.bme.hu/api/profile?access_token=' + accessToken, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return cb(null, JSON.parse(body), null);
            } else {
                return cb(new Error('oauth2 authentication failure'));
            }
        });
    }));


app.use(function (req, res, next) {
    res.locals.logged_in = req.isAuthenticated();
    res.locals.active = req.path.split('/')[1];
    console.log(res.locals.active);
    next();
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/**
 * Create .error and .tpl on res
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];
    return next();
});

/**
 * Public directory
 */
app.use('/public', express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'hotstockicon.ico')));

/**
 * Include routes
 */
require('./routes/users')(app);
require('./routes/db')(app);
var indexRoute = require('./routes/index');
var authorizationRoutes = require('./routes/auth');

/**
 *  Use routes
 */
app.use('/auth', authorizationRoutes);
app.use('/', indexRoute);

/**
 * Error handler
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 *  Start server
 */
var server = app.listen(3000, function () {
  console.log('Running on :3000');
});
