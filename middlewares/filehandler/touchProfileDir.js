module.exports = function (fs) {

    var dir = './uploads/images/profile';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};