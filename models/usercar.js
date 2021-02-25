'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCar extends Model {
    static associate(models) {
      // define association here
      UserCar.belongsTo(models.Car, {
        foreignKey: 'CarId',
        targetKey: 'id'
      }),
        UserCar.belongsTo(models.User, {
          foreignKey: 'UserId',
          targetKey: 'id'
        })
    }

    //static method to calculate total day rent 
    static getTotalDay(start, finish) {
      let totalDay = finish.getDate() - start.getDate();
      return totalDay;
    }
  };
  UserCar.init({
    UserId: DataTypes.INTEGER,
    CarId: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    finish_date: DataTypes.DATE,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCar',
  });
  
  return UserCar;
};