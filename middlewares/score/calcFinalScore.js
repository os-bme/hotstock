module.exports = function (objectrepository) {

    return function (req, res, next) {

        var finalScore = 0;

        for( var score in res.tpl.scores ) {
            finalScore += score.value;
        }

        res.tpl.app.final_score = finalScore;

        return next();

    }
};