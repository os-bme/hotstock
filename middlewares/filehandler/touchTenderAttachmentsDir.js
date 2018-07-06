module.exports = function (fs) {

    var dir = './uploads/attachments/tender';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

};