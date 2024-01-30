'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'profile_image_url', {
      type: Sequelize.STRING(2000),
      allowNull: true // or false based on your requirements
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'profile_image_url', {
      type: Sequelize.STRING(1024),
      allowNull: true // or false based on your requirements
    })
  }
}
