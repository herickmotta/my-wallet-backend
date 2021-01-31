const bcrypt = require('bcrypt');
const userSchemas = require('../schemas/userSchemas');
const usersRepository = require('../repositories/usersRepository');
const sessionsRepository = require('../repositories/sessionsRepository');
const { findById } = require('../repositories/usersRepository');

async function postSignUp(req, res) {
  const userParams = req.body;
  const { error } = userSchemas.signUp.validate(userParams);
  if (error) return res.status(422).send({ error: error.details[0].message });

  const checkEmailUnique = await usersRepository.findByEmail(userParams.email);
  if (checkEmailUnique) {
    return res.sendStatus(409);
  }
  userParams.password = bcrypt.hashSync(userParams.password, 12);

  try {
    const user = await usersRepository.create(userParams);
    return res.status(201).send(user);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

async function postSignIn(req, res) {
  const userParams = req.body;

  const { error } = userSchemas.signIn.validate(userParams);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const user = await usersRepository.findByEmail(userParams.email);
    if (!user) {
      return res.status(401).send({ error: 'Wrong email or password' });
    }
    if (!bcrypt.compareSync(userParams.password, user.password)) {
      return res.status(401).send({ error: 'Wrong email or password' });
    }
    const { token } = await sessionsRepository.createByUserId(user.id);
    const userData = filterUserData(user);

    return res.send({ ...userData, token });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function postSignOut(req, res) {
  await sessionsRepository.destroyByUserId(req.user.id);
  return res.sendStatus(200);
}

async function getUserInfo(req, res) {
  try {
    const user = await findById(req.user.id);
    return res.send(user);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
function filterUserData(user) {
  const {
    id, name, email, balance,
  } = user;
  return {
    id, name, email, balance,
  };
}

module.exports = {
  postSignIn,
  postSignUp,
  getUserInfo,
  postSignOut,
};
