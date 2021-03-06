'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
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
