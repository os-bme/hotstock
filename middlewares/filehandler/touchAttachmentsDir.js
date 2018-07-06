module.exports = function (fs) {

    var dir = './uploads/attachments';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

};