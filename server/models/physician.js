'use strict';
module.exports = (sequelize, DataTypes) => {
    const Physician = sequelize.define('Physician', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        age: DataTypes.INTEGER,
        specialityId: DataTypes.INTEGER,
        addressId: DataTypes.INTEGER
    }, {});
    Physician.associate = function(models) {
        Physician.belongsToMany(models.Patient, { through: "Appointment", foreignKey: "physicianId" });
    };
    return Physician;
};