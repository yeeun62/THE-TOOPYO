'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {}
    }
    user.init(
        {
            nickName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            profile_img: DataTypes.STRING,
            provider: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'user',
        },
    );
    return user;
};
