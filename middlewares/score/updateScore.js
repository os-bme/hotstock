module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (isScoreNull(res)) {
            createScore(res, objectRepository);
        }

        copyScoreData(res, req);
        res.tpl.score._evaulator = req.session.passport.user._id;
        saveScore(res, next);
    }

};

function isScoreNull(res) {
    return res.tpl.score === undefined || res.tpl.score === null;
}

function createScore(res, objectRepository) {
    res.tpl.score = new objectRepository.scoreModel();
    res.tpl.func.logger.info("Score created (scoreID: " + res.tpl.score._id + ")");
}

function copyScoreData(res, req) {
    res.tpl.score.status = req.body.status;
    res.tpl.score.value = req.body.value;
    res.tpl.score.comment = req.body.comment;
    res.tpl.score._app_part = req.params.part;
}

function saveScore(res, next) {
    res.tpl.score.save(function (err) {
        if (err != null) {
            res.tpl.error.push(err);
            res.tpl.func.logger.error("Score save failure " + err);
            return next(err);
        }

        res.tpl.func.logger.info("Score save success (scoreID: " + res.tpl.score._id + ")");
        return next();
    });
}