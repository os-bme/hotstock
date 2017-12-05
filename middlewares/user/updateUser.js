module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.user = new objectrepository.userModel();
        res.tpl.user.name = "Test Elek";
        res.tpl.user.bme_id = 1234;
        res.tpl.user.email = "valami@proba.hu";
        res.tpl.user.post_type = "user";

        res.tpl.user.save(function (err) {
            if (err !== null){
                res.tpl.error.add(err);
            }
            return next();
        });
    }
};