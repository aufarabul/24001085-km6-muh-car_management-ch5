"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("car_availabilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      car_id: {
        allowNull: false,

        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "cars",
          },
          key: "id",
        },
      },
      available: {
        allowNull: false,

        type: Sequelize.BOOLEAN,
      },
      availableAt: {
        allowNull: false,

        type: Sequelize.DATE,
      },
      rentPerDay: {
        allowNull: false,

        type: Sequelize.INTEGER,
      },
      deletedAt: {
        allowNull: true,

        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("car_availabilities");
  },
};
