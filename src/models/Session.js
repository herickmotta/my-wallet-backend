const { Sequelize } = require("sequelize/types");
const sequelize = require("../database");
class Session extends Sequelize.Model {}

Session.init(
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
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        sequelize,
        modelName: 'session'
    }
);

module.exports = Session;