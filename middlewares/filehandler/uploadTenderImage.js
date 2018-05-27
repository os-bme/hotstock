module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(!req.files) {
            console.log("Image for tender is not uploaded");
            return next();
        }

        console.log("Image for tender is uploaded");
        var tenderImage = req.files.tenderImage;
        var tenderImageName = req.files.tenderImage.name.split('.');
        tenderImage.mv('uploads/images/tender/' + res.tpl.tender._id + '.' + tenderImageName[ tenderImageName.length-1 ] , function (err) {
            if (err){
                console.log(err);

                var err = new Error(err);
                err.status = 500;
                return next(err);
            }

            console.log('Image for tender is saved!');
            return next();
        });

    };

};