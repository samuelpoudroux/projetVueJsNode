'use strict';
module.exports = (sequelize, DataTypes) => {
  const Speciality = sequelize.define('Speciality', {
    label: DataTypes.STRING
  }, {});
  Speciality.associate = function(models) {
    // associations can be defined here
  };
  return Speciality;
};