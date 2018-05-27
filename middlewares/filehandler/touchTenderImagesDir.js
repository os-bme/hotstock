module.exports = function (fs) {

    var dir = './uploads/images/tender';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};