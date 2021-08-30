'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class agree extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    agree.init(
        {
            //user_id: DataTypes.INTEGER,
            //content_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'agree',
        },
    );
    return agree;
};
