'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsToMany(models.Car, {
        through: models.UserCar,
        foreignKey: 'UserId'
      })
    }

    //instance method
    getFullNameUser() {
      return `${this.first_name}  ${this.last_name}`
    }

  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    identity_number: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};