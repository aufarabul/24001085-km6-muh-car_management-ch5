"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car_detail.belongsTo(models.cars, { foreignKey: "car_id" });
    }
  }
  car_detail.init(
    {
      car_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      transmission: DataTypes.STRING,
      type: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "car_detail",
      paranoid: true,
    }
  );
  return car_detail;
};
