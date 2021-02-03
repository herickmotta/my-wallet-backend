const { Sequelize } = require('sequelize');
const sequelize = require('../database');

class Transaction extends Sequelize.Model { }

Transaction.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNulll: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    sequelize,
    modelName: 'transaction',
  },
);

module.exports = Transaction;
