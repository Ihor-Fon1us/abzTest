const multer = require('multer');
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(new multer.MulterError("jpg" ,"The photo format must be jpeg/jpg type"));
    }
 }

module.exports = multer({storage, fileFilter, limits:{fileSize: 5000000 }});