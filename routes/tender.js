var express = require('express');
var router = express.Router();

var authUserMW = require('../middlewares/general/authUser');
var authEditorMW = require('../middlewares/general/authEditor');
var authAdminMW = require('../middlewares/general/authAdmin');
var authSuperAdminMW = require('../middlewares/general/authSuperAdmin');

var renderMW = require('../middlewares/general/render');

var UserModel = require('../models/users');
var TenderModel = require('../models/tenders');

var objectRepository = {
    userModel: UserModel,
    tenderModel: TenderModel
};

router.use('/active',
    function (req, res, next) {
        res.tpl.tenders = [];

        var tender = {
            _id: 0,
            title: 'tender one',
            short_description:  'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS. ',
            publish_datetime: '2018-01-01'
        };
        res.tpl.tenders.push( tender );

        var tender = {
            _id: 1,
            title: 'tender two',
            short_description:  'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS. ',
            publish_datetime: '2018-01-01'
        };
        res.tpl.tenders.push( tender );

        var tender = {
            _id: 2,
            title: 'tender three',
            short_description:  'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS. ',
            publish_datetime: '2018-01-01'
        };
        res.tpl.tenders.push( tender );

        return next();
    },
    renderMW(objectRepository, 'tenderList')
);

router.use('/all',
    authAdminMW(objectRepository),
    renderMW(objectRepository, 'tenderList')
);

router.use('/add',
    authEditorMW(objectRepository),
    renderMW(objectRepository, 'tenderList')
);

router.use('/:id/del',
    authSuperAdminMW(objectRepository),
    renderMW(objectRepository, 'tender')
);

router.use('/:id/mod',
    authEditorMW(objectRepository),
    renderMW(objectRepository, 'tender')
);

router.use('/:id/app',
    authAdminMW(objectRepository),
    renderMW(objectRepository, 'appList')
);

router.use('/:id',
    function (req, res, next) {
        res.tpl.tender = {
            _id: 2,
            title: 'tender three',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur non augue et nisi porttitor pretium. Mauris vel neque vitae orci luctus aliquet. Nulla facilisi. Donec in mi. Curabitur semper massa quis diam. Ut dignissim elit at nisi. Mauris nec ipsum. Nunc ac quam. Donec in diam. Phasellus tempus scelerisque justo.',
            start_datetime: '2018-05-01',
            end_datetime: '2018-06-01',
            publisher: {
                name: 'Béla'
            }
        };
        return next();
    },
    renderMW(objectRepository, 'tender')
);

module.exports = router;