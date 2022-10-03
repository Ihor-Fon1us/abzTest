const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const schema = require('../validator/schema');

const Ajv = require("ajv");
const ajv = new Ajv(addFormat("UA_Phone", /^(?:\+38)?(0\d{9})$/));

// ajv.;


const validate = ajv.compile(schema);

const getToken = () => {
  return (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const token = jsonwebtoken.sign({email: "122121212"}, "12");
    return res.status(200).json({success: true, token}).end();
  }
}

const userValidate = () => {
  return (req, res, next) => {
    const valid = validate(req.body);
    if(valid) {
      next();
    } else {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        fails: {
            name: "The name must be at least 2 characters.",
            email: "The email must be a valid email address.",
            phone: "The phone field is required.",
            position_id: "The position id must be an integer.",
            photo: "The photo may not be greater than 5 Mbytes. Image is invalid."
        }
      }).end();
    }

  }
}

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/token', getToken());

router.route('/users')
  .get((req, res, next) => {

  })
  .post(userValidate() ,async (req, res, next) => {
    try {
      const user = await sequelize.models.users.create(req.body);
      res.status(200).json({
        success: true,
        user_id: user.id,
        message: "New user successfully registered"
      }).end();
    } catch (error) {

      console.log(error);
      res.status(400).send(error);
    }
  }) 

router.get('/users/{id}', (req, res, next) => {

});

router.get('/positions', (req, res, next) => {

});

module.exports = router;
