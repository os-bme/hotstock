module.exports = function (fs) {

    var dir = './uploads/images';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

};