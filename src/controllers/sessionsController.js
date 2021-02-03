const { v4: uuidv4 } = require('uuid');
const NotFoundError = require('../errors/NotFoundError');
const Session = require('../models/Session');

class SessionsController {
  static async create(userId) {
    const token = uuidv4();
    await Session.create({ userId, token });
  }

  static async getSessionById(id) {
    const session = await Session.findByPk(id);
    if (!session) throw new NotFoundError();
    return session;
  }

  static async getSessionByToken(token) {
    const session = await Session.findOne({ where: { token } });
    if (!session) throw new NotFoundError();
    return session;
  }
}

module.exports = new SessionsController();
