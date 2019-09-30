'use strict';
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        physicianId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        meetingDate: DataTypes.DATE,
        meetingName: DataTypes.STRING,

    }, {});
    Appointment.associate = function(models) {
        // associations can be defined here
    };
    return Appointment;
};