const fs = require('fs');
const sharp = require('sharp');
const { PhotoError } = require('../controllers/AplicationErrors');

module.exports = async function PhotoCropMiddleware(req, res, next) {
    if (req.file) {
        const buffer = sharp(req.file.buffer);
        await buffer
            .metadata().then((metadata) => {
                if (metadata.height < 70 && metadata.width < 70) {
                    throw new Error();
                } 
            })
            .catch(err => { req.body.photo = new PhotoError(); next(); })

        req.file.croppedBuffer = await buffer
            .resize({ width: 70, height: 70 })
            .withMetadata()
            .jpeg({ mozjpeg: true })
            .toBuffer()
            .catch(err => { req.body.photo = new PhotoError(); next(); })
            next();
    } else next();
}