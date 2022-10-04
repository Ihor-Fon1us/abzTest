const config = require('../bin/config');
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
  host: config.POSTGRES_HOST,
  dialect: 'postgres'
});

const Users = require('./models/users.model');

Users(sequelize);
sequelize.sync();
module.exports = sequelize;