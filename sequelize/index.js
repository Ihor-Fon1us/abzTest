
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test_db', 'root', 'root', {
  host: '172.17.0.1',
  dialect: 'postgres'
});

const Users = require('./models/users.model');

Users(sequelize);
module.exports = sequelize;