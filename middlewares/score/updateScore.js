module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.score.value = req.body.value;
        res.tpl.score.comment = req.body.comment;
        res.tpl.score._evaulator = req.session.passport.user._id;
        res.tpl.score._app_part = req.params.part;

        res.tpl.score.save(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Score update: error");
            } else {
                console.log("Score update: success");
            }

            return next();

        });

    }

};