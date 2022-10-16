const tinify = require("tinify");
const config = require('../bin/config');
const fs = require('fs');
const nanoid = require('nanoid');
const { PhotoError } = require("../controllers/AplicationErrors");
tinify.key = config.TINIFY_KEY;

module.exports = function PhotoCompressionMiddleware (req, res, next) {
    if (req.file.croppedBuffer) {
        tinify.fromBuffer(req.file.croppedBuffer).toBuffer(function (err, resultData) {
            if (err) {
                req.body.photo = new PhotoError();
                next();
                return
            }

            const folder = config.PHOTO_FOLDER;
            const filename = `${folder}/${nanoid(15)}.jpeg`;
            
            fs.writeFile(filename, resultData, (err) => {
                if(err) {
                    req.body.photo = new PhotoError();
                } else {
                    req.body.photo = filename;
                }
                next();
            });;
            
        })
    } else next();
}