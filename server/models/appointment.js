'use strict';
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        meetingName: DataTypes.STRING,
        meetingDate: DataTypes.DATE,
        patientId: DataTypes.INTEGER,
        physicianId: DataTypes.INTEGER
    }, {});
    Appointment.associate = function(models) {
        Appointment.belongsTo(models.Physician);
        Appointment.belongsTo(models.Patient);
    };
    return Appointment;
};