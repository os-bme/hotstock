module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.user.permission = req.body.permission;

        res.tpl.user.save(function (err) {

            if (err != null) {
                res.tpl.error.push(err);
                console.log("Update user permission: error");
            } else {
                console.log("Update user permission: success");
            }

            return next();

        });
    }

};