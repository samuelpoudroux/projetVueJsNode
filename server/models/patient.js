'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};