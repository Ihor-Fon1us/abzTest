const multer = require('multer');
const upload = require('./multer').single('file');


module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            req.body.photo = err;
        } else if (err) {
            next(err);
        }
        next();
    })
}