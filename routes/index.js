const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');

const getToken = () => {
  return (req, res) => {
    const token = jsonwebtoken.sign({email: "122121212"}, "12");
    res.setHeader('Content-Type', 'application/json');
    return res.json(token);
  }
}   


router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/token', getToken());

router.route('/users')
  .get((req, res, next) => {

  })
  .post((req, res, next) => {

  }) 

router.get('/users/{id}', (req, res, next) => {

});

router.get('/positions', (req, res, next) => {

});

module.exports = router;
