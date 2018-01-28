var express = require('express');
var router = express.Router();

var renderMW = require('../middlewares/general/render');
var updateUser = require('../middlewares/user/updateUser');

var UserModel = require('../models/users');
var TenderModel = require('../models/tenders');

var objectRepository = {
    userModel: UserModel,
    tenderModel: TenderModel
};

router.use('/active',
    function (req, res, next) {
        res.tenders = [];

        var tender = new TenderModel();
        tender = {
            _id: 0,
            title: 'tender one',
            short_description:  'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS. ',
            publish_datetime: '2018-01-01'
        };
        res.tenders.push( tender );

        var tender = new TenderModel();
        tender = {
            _id: 1,
            title: 'tender two',
            short_description:  'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS. ',
            publish_datetime: '2018-01-01'
        };
        res.tenders.push( tender );

        var tender = new TenderModel();
        tender = {
            _id: 2,
            title: 'tender three',
            short_description:  'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS. ',
            publish_datetime: '2018-01-01'
        };
        res.tenders.push( tender );

        return next();
    },
    renderMW(objectRepository, 'tenderAll')
);

module.exports = router;