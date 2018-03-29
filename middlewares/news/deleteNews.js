module.exports = function (objectRepository) {

    return function (req, res, next) {

        objectRepository.newsModel.findOne({_id: req.params.id}).remove(function (err) {

            if (err != null) {
                res.tpl.error.add(err);
                console.log("Delete news: error");
            } else {
                console.log("Delete news: success");
            }

            return next();

        });
    }
};