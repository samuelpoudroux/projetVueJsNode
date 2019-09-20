'use strict';
module.exports = (sequelize, DataTypes) => {
  const Physician = sequelize.define('Physician', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    speciality: DataTypes.STRING,
    addressId: DataTypes.INTEGER
  }, {});
  Physician.associate = function(models) {
    // associations can be defined here
  };
  return Physician;
};