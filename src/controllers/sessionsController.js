const { v4: uuidv4 } = require('uuid');
const NotFoundError = require('../errors/NotFoundError');
const Session = require('../models/Session');

class SessionsController {
  create(userId) {
    const token = uuidv4();
    return Session.create({ userId, token });
  }

  async getSessionById(id) {
    const session = await Session.findByPk(id);
    if (!session) throw new NotFoundError('Session not found');
    return session;
  }

  async getSessionByToken(token) {
    const session = await Session.findOne({ where: { token } });
    if (!session) throw new NotFoundError('Session not found');
    return session;
  }
}

module.exports = new SessionsController();
