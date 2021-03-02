const NotFoundError = require('../errors/NotFoundError');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

class TransactionsController {
  async create(transactionParams) {
    const { userId } = transactionParams;
    const user = await User.findByPk(userId);
    if (!user) throw new NotFoundError('User not found');
    const transaction = await Transaction.create(transactionParams);

    if (transactionParams.type === 'input') {
      user.balance += transaction.value;
    } else {
      user.balance -= transaction.value;
    }

    user.save();

    return transaction;
  }

  async getByUserId(userId) {
    const transactions = await Transaction.findAll({ where: { userId } });
    const { balance } = await User.findByPk(userId, { attributes: ['balance'] });
    return { transactions, balance };
  }

  async destroy(transactionId) {
    await Transaction.destroy({ where: transactionId });
  }
}

module.exports = new TransactionsController();
