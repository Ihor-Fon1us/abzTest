'use strict';
const GenerateUser = require('../GenerateUser');
const generator = new GenerateUser();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'positions',
      [
        {
          name: 'Security',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Designer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Content manager',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lawyer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {},
    )
    await queryInterface.bulkInsert(
      'users', generator.getArrayUsers(45),
      {},
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('positions', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
};