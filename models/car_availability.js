"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car_availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car_availability.belongsTo(models.cars, { foreignKey: "car_id" });
    }
  }
  car_availability.init(
    {
      car_id: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      availableAt: DataTypes.DATE,
      rentPerDay: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "car_availability",
    }
  );
  return car_availability;
};
