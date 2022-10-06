const sequelize = require('../sequelize');
const { newValidationError, UserNotFoundError } = require('./error');
const Mapper = require('./mapper');

sequelize.sync();

module.exports.createUserHandler = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    await sequelize.models.user.create(req.body).then((user) => {
      return res.status(200).json({
        success: true,
        user_id: user.id,
        message: "New user successfully registered"
      }).end();
    })
  } catch (error) {
    next(new newValidationError(error.errors.reduce(function (m, v) { m[v.path] = [v.message]; return m; }, {})))
  }
}


module.exports.getUserHandler = async (req, res, next) => {
  try {
    const users = await sequelize.models.user.findAll({
      include: [{
        model: sequelize.models.position, 
      }],})
    res.status(200).json({
      success: true,
      page: curentPage,
      total_pages: totalPages,
      total_users: users.count,
      count: req.body.count,
      links: {
        next_url: "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=2&count=5",
        prev_url: null
      },
      users: users
    })
  } catch (error) {

  }
}


module.exports.getUserById = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const user = await sequelize.models.user.findByPk(req.params.id, {
      include: [{
        model: sequelize.models.position, 
      }],});
    if (user === null) {
      return next(new UserNotFoundError());
    }
    res.status(200).json({
      success: true,
      user: Mapper.UserToAPI(user)
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
}

