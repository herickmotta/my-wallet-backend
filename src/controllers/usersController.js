const bcrypt = require('bcrypt');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const Session = require('../models/Session');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const sessionsController = require('./sessionsController');

class UsersController {
  static async signUp(userParams) {
    const { name, email, password } = userParams;
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) throw new ConflictError();

    const hashedPassword = bcrypt.hashSync(password, 12);
    await User.create({ name, email, hashedPassword });
  }

  static async signIn(userParams) {
    const { email, password } = userParams;

    const user = User.findOne({ where: { email } });
    if (!user) throw new UnauthorizedError();

    const match = bcrypt.compareSync(password, user.password);
    if (!match) throw new UnauthorizedError();

    await sessionsController.create(user.id);

    return user;
  }

  static async signOut(userId) {
    await Session.destroy({ where: { userId } });
  }

  static async getUserById(userId) {
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['email', 'name'],
      include: Transaction,
    });
    if (!user) throw new NotFoundError();
    return user;
  }
}

module.exports = new UsersController();
