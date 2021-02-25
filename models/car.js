'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      // define association here
      Car.belongsToMany(models.User, {
        through: models.UserCar,
        foreignKey: 'CarId'
      });

    }
  };
  Car.init({
    merk: DataTypes.STRING,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    rental_price_per_day: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    status: DataTypes.STRING,
    plat_number: DataTypes.STRING,
    stocks: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};