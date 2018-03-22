var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var findAppByIdMW = require('../middlewares/app/findAppbyId');
var updateAppMW = require('../middlewares/app/updateApp');

var findAppPartByIdMW = require('../middlewares/app_part/findAppPartbyId');
var updateAppPartMW = require('../middlewares/app_part/updateAppPart');

var updateScoreMW = require('../middlewares/score/updateScore');
var findScoreByAppPartIdMW = require('../middlewares/score/findScorebyAppPartId');

var redirectPrevMW = require('../middlewares/general/redirectPrev');
var redirectMW = require('../middlewares/general/redirect');
var renderMW = require('../middlewares/general/render');
var redirectToAppMw = require('../middlewares/general/redirectToApp');

var UserModel = require('../models/users');
var AppModel = require('../models/apps');
var ScoreModel = require('../models/scores');
var AppPartModel = require('../models/app_parts');

var objectRepository = {
    appModel: AppModel,
    userModel: UserModel,
    scoreModel: ScoreModel,
    appPartModel: AppPartModel
};

router.post('/:id/:part',
    authAdminMW(objectRepository),
    findAppByIdMW(objectRepository),
    findAppPartByIdMW(objectRepository),
    findScoreByAppPartIdMW(objectRepository),
    updateScoreMW(objectRepository),
    updateAppPartMW(objectRepository),
    updateAppMW(objectRepository),
    redirectToAppMw(objectRepository)
);

module.exports = router;
