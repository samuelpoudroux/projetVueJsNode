'use strict';
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        street: DataTypes.STRING,
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        door: DataTypes.INTEGER
    }, {});
    Address.associate = function(models) {
        Address.belongsTo(models.Physician)
        Address.hasOne(models.Patient, { foreignKey: "addressId" });
        Address.hasOne(models.Physician, { foreignKey: "addressId" });
    };
    return Address;
};