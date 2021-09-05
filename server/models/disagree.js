'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class disagree extends Model {
        static associate(models) {}
    }
    disagree.init(
        {},
        {
            sequelize,
            modelName: 'disagree',
        },
    );
    return disagree;
};
