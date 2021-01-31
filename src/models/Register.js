const { Sequelize } = require("sequelize/types");
const sequelize = require("../database");
class Register extends Sequelize.Model {}

Register.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNulll: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        sequelize,
        modelName: 'register'
    }
);

module.exports = Register;