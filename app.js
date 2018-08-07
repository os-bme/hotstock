require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var configuration = require('./config.json');
require('winston-daily-rotate-file');
var i18n = require('i18n-express');
var winston = require('winston');
require('winston-daily-rotate-file');
var fileSystem = require('file-system');
var fs = require('fs');
var fileUpload = require('express-fileupload');
var http = require('http');

var passport = require('passport'),
    OAuth2Strategy = require('passport-oauth2');

var session = require('express-session');
var app = express();

/**
 *  View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 *  Cookie and body parser
 */
app.use(logger('dev'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/**
 *  Crate session
 */
app.use(session({
    secret: configuration.sessionSecret,
    cookie: {
        maxage: 60000,
        secure: false
    },
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Create .error and .tpl on res
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];
    res.tpl.func = {
        moment: moment,
        logger: logger,
        fileSystem: fileSystem,
        fs: fs,
        reqIP: function (req) {
            return  req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                req.headers['x-forwarded-for'];
        },
        userID: function (req, res) {
            if (!req.session.passport || !req.session.passport.user) {
                return res.tpl.func.reqIP(req);
            } else {
                return req.session.passport.user._id;
            }
        }
    };
    return next();
});

/**
 *  Logger
 */
const {createLogger, format, transports} = winston;
const {combine, timestamp, label, printf, colorize} = format;

const hotstockFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

logger = createLogger({
    level: 'verbose',
    transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
            filename: 'log/Hotstock_%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: false,
            maxSize: '20m'
        })
    ]
});

app.use(function (req, res, next) {
    logger.format = combine(
        label({label: res.tpl.func.userID(req, res)}),
        colorize(),
        timestamp(),
        hotstockFormat
    );
    logger.log('verbose', req.path);
    next();
});

/**
 *  OAuth2
 */
passport.use(new OAuth2Strategy({
        authorizationURL: 'https://auth.sch.bme.hu/site/login',
        tokenURL: 'https://auth.sch.bme.hu/oauth2/token',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/oauth/callback",
        scope: configuration.SCOPE
    },
    function (accessToken, refreshToken, profile, cb) {
        var request = require('request');
        request('https://auth.sch.bme.hu/api/profile?access_token=' + accessToken, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                logger.info('Oauth2 authentication success ( accessToken: ' + accessToken + " )");
                return cb(null, JSON.parse(body), null);
            } else {
                logger.error('Oauth2 authentication failure');
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
 * Public directory
 */
app.use('/public', express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'hotstockicon.ico')));

/**
 * I18n
 */
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ['hu','en'],
  defaultLang : 'hu',
  browserEnable: false,
  textsVarName: 'i18n'
}));

/**
 * Include routes
 */
var userRoute = require('./routes/users');
var dbRoute = require('./routes/db');
var generalRoute = require('./routes/general');
var authRoute = require('./routes/auth');
var newsRoute = require('./routes/news');
var tenderRoute = require('./routes/tender');
var appRoute = require('./routes/app');
var scoreRoute = require('./routes/score');

/**
 *  Use routes
 */
app.use('/', generalRoute);
app.use('/user', userRoute);
app.use('/db', dbRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);
app.use('/tender', tenderRoute);
app.use('/app', appRoute);
app.use('/score', scoreRoute);

/**
 * Error handler
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 *  Error handler
 */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.error = err;
    res.render('error', {req: req, res: res});
});

/**
 *  Start server
 */
var server = app.listen(process.env.APP_PORT, function () {
    //Run initial setup
    var setup = require('./setup');
    setup(fs);

    logger.format = combine(
        label({label: '   HOTSTOCK APP SERVER  '}),
        colorize(),
        timestamp(),
        hotstockFormat
    );
    logger.info('Running on :' + process.env.APP_PORT);
});
