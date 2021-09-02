'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class content extends Model {
        static associate(models) {}
    }
    content.init(
        {
            userId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            picture_1: DataTypes.STRING,
            picture_2: DataTypes.STRING,
            description: DataTypes.STRING,
            voting_deadline: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'content',
        },
    );
    return content;
};
