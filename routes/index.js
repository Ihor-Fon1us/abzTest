const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tokenController = require('../controllers/tokenController');
const positionsController = require('../controllers/positionsController');
const photoUpload = require('../middleware/photoUpload');
const photoCropp = require('../middleware/photoCrop');
const photoCompression = require('../middleware/photoCompression');
const validateReq = require('../middleware/validateReq');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/token', tokenController.getToken);

router.route('/users')
  .get( userController.getUserHandler)
  .post(tokenController.tokenVerification, photoUpload, photoCropp, photoCompression,  userController.createUserHandler)

router.get('/users/:id', userController.getUserById);

router.get('/positions', positionsController.getPosiions);

module.exports = router;
