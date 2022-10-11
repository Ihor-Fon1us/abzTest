const tinify = require("tinify");
const config = require('../bin/config');
const fs = require('fs');
const generatorId = require('../services/generatorId');
const { PhotoError } = require("../controllers/AplicationErrors");
tinify.key = config.TINIFY_KEY;

module.exports = (req, res, next) => {
    if(req.file.croppedBuffer) {
        tinify.fromBuffer(req.file.croppedBuffer).toBuffer(function (err, resultData) {
            if (err) { req.body.photo = new PhotoError; next(); } 
    
            const folder = config.PHOTO_FOLDER;
            const id = generatorId(15);
            const filename = `${folder}/${id}.jpeg`;
            fs.writeFileSync("." + filename, resultData);
            req.body.photo = filename;
            next();
        })
    } else next();
}