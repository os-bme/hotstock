var express = require('express');
var app = express();

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

/**
 * Include routes
 */
require('./routes/users')(app);
require('./routes/db')(app);
require('./routes/index')(app);

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send("Error");                      // sends a http err msg
    console.error(err.stack);                           // write the err to std:err
});

/**
 *  Start server
 */
var server = app.listen(3000, function () {
  console.log('Running on :3000');
});
