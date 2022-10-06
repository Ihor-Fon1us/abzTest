'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
    'users',
    [
      {
        name: 'Jhon',
        email: 'jhon@aaa.com',
        phone: '+380667777001',
        position_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'mike1',
        email: 'mike@aaas.com',
        phone: '+380667777002',
        position_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jhon',
        email: 'jhon@aaaa.com',
        phone: '+380667777003',
        position_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jhon',
        email: 'jhon@mike.com',
        phone: '+380667777004',
        position_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  )
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('positions', null, {})
    
  }
};