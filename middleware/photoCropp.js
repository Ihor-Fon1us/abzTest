const fs = require('fs');
const sharp = require('sharp');
const { PhotoError } = require('../controllers/AplicationErrors');

module.exports = async (req, res, next) => {
    if (req.file) {
        const buffer = await sharp(req.file.buffer)
            .resize({ width: 70, height: 70 })
            .jpeg({ mozjpeg: true })
            .toBuffer()
            .catch( err => { req.body.photo = new PhotoError; next();});
        req.file.croppedBuffer = buffer;
        next();
    } else next();
}