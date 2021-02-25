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
    status: DataTypes.STRING,
    plat_number: DataTypes.STRING,
    imageURL: {
      type: DataTypes.STRING,
      validate: {
        isURL: {
          args: true,
          msg: 'Format image must be in URL'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};