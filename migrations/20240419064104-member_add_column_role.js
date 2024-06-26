"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("members", "role", {
      type: Sequelize.ENUM("member", "admin", "superadmin"),
      allowNull: true,
      defaultValue: "member",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("members", "role");
  },
};
