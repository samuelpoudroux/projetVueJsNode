'use strict';
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        street: DataTypes.STRING,
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        door: DataTypes.INTEGER
    }, {});
    Address.associate = function(models) {
        // associations can be defined here
    };
    return Address;
};