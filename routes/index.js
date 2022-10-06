const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tokenController = require('../controllers/tokenController');
const positionsController = require('../controllers/positionsController');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/token', tokenController.getToken);

router.route('/users')
  .get(userController.getUserHandler)
  .post(tokenController.tokenVerification, userController.createUserHandler)

router.get('/users/:id', userController.getUserById);

router.get('/positions', positionsController.getPosiions);

module.exports = router;
