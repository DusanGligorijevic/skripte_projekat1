'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('users', 'name', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('users', 'admin', {
          type: Sequelize.STRING,
        }, { transaction: t })
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
