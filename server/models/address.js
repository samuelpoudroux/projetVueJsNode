'use strict';
module.exports = (sequelize, DataTypes) => {
    const address = sequelize.define('address', {
        street: DataTypes.STRING
    }, {});
    address.associate = function(models) {

    };
    return address;
};