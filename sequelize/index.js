const config = require('../bin/config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.EXTERNAL_DATABASE)
// const sequelize = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
//   host: config.POSTGRES_HOST,
//   dialect: 'postgres'
// });

const Users = require('../models/users.model');
const Positions = require('../models/positions.model');

Users(sequelize);
Positions(sequelize);

sequelize.models.position.hasMany(sequelize.models.user, {
  foreignKey: 'position_id',
});
 sequelize.models.user.belongsTo(sequelize.models.position,{
  foreignKey: 'position_id',
});




module.exports = sequelize;