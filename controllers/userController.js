const sequelize = require('../sequelize');
const { ValidationError, UserNotFoundError } = require('./APIErrors');
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
    if (Array.isArray(error.errors)) {
      next(new ValidationError(error.errors.reduce(function (m, v) { m[v.path] = [v.message]; return m; }, {})));
    } else next(error);
  }
}


module.exports.getUserHandler = async (req, res, next) => {
  try {
    const offset = req.query.offset > 0 ? req.query.offset : ((req.query.page - 1) * req.query.count);
    const totalUsers = await sequelize.models.user.count();
    const users = await sequelize.models.user.findAll({
      include: [{
        model: sequelize.models.position,
      }],
      offset: offset,
      limit: req.query.count,
    })
    if (users.length === 0) {
      return next(new UserNotFoundError());
    }
    const data = Mapper.UsersToAPI(req, users, totalUsers, offset, "localhost:3000");
    res.status(200).json(
      Mapper.UsersToAPI(req, users, totalUsers, offset, "localhost:3000")
    );
  } catch (error) {
    next(error);
  }
}


module.exports.getUserById = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const user = await sequelize.models.user.findByPk(req.params.id, {
      include: [{
        model: sequelize.models.position,
      }],
    });
    if (user.length === 0) {
      return next(new UserNotFoundError());
    }
    res.status(200).json({
      success: true,
      user: Mapper.UserToAPI(user)
    })
  } catch (error) {
    next(error);
  }
}

