const sessionsController = require('../controllers/sessionsController');
const usersController = require('../controllers/usersController');
const AuthHeaderError = require('../errors/AuthHeaderError');
const InvalidTokenError = require('../errors/InvalidTokenError');
const NotFoundError = require('../errors/NotFoundError');

async function authMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw new AuthHeaderError('authorization token not found');
  const token = authHeader.replace('Bearer ', '');
  const session = await sessionsController.getSessionByToken(token);
  if (!session) throw new InvalidTokenError('token is invalid');
  const user = await usersController.getUserById(session.userId);
  if (!user) return new NotFoundError('user not found');

  req.user = user;
  req.session = session;
  return next();
}

module.exports = authMiddleware;
