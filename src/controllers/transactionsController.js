const NotFoundError = require('../errors/NotFoundError');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

class TransactionsController {
  static async create(transactionParams) {
    const { userId } = transactionParams;
    const user = await User.findByPk(userId);
    if (!user) throw new NotFoundError();

    const transaction = await Transaction.create(transactionParams);
    user.balance += transaction.value;
    user.save();

    return transaction;
  }

  static async destroy(transactionId) {
    await Transaction.destroy({ where: transactionId });
  }
}

module.exports = new TransactionsController();
