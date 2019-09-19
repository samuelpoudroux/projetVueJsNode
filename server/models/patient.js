'use strict';
module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        age: DataTypes.INTEGER,
        addressId: DataTypes.INTEGER
    }, {});
    Patient.associate = function(models) {
        Patient.belongsToMany(models.Physician, { through: "Appointment", foreignKey: "patientId" });
    };
    return Patient;
};