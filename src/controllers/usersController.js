const bcrypt = require('bcrypt');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const Session = require('../models/Session');
const User = require('../models/User');
const sessionsController = require('./sessionsController');

class UsersController {
  async signUp(userParams) {
    const { name, email, password } = userParams;
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) throw new ConflictError('email already exists');

    const hashedPassword = bcrypt.hashSync(password, 12);
    await User.create({ name, email, password: hashedPassword });
  }

  async signIn(userParams) {
    const { email, password } = userParams;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new UnauthorizedError('invalid credentials');

    const match = bcrypt.compareSync(password, user.password);
    if (!match) throw new UnauthorizedError('invalid credentials');

    const session = await sessionsController.create(user.id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: session.token,
      balance: user.balance,
    };
  }

  async signOut(userId) {
    await Session.destroy({ where: { userId } });
  }

  async getUserById(userId) {
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'email', 'name', 'balance'],
    });
    if (!user) throw new NotFoundError();
    return user;
  }
}

module.exports = new UsersController();
