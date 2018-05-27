module.exports = function (fs) {

    var dir = './uploads/images/news';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};