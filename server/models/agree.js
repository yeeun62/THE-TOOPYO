'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class agree extends Model {
        static associate(models) {}
    }
    agree.init(
        {},
        {
            sequelize,
            modelName: 'agree',
        },
    );
    return agree;
};
