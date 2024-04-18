"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cars.hasMany(models.car_detail, { foreignKey: "car_id" });
      cars.hasMany(models.car_availability, { foreignKey: "car_id" });
    }
  }
  cars.init(
    {
      plate: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      model: DataTypes.STRING,
      year: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "cars",
      tableNameL: "cars",
      paranoid: true,
    }
  );
  return cars;
};
