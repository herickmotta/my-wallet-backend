const router = require('express').Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const userSchemas = require('../schemas/userSchemas');

router.post('/sign-up', async (req, res) => {
  const { error } = userSchemas.signUp.validate(req.body);
  if (error) throw error;
  await usersController.signUp(req.body);

  res.status(201);
});

router.post('/sign-in', async (req, res) => {
  const { error } = userSchemas.signIn.validate(req.body);
  if (error) throw error;
  const user = await usersController.signIn(req.body);
  res.send(user);
});

router.get('/', authMiddleware, async (req, res) => {
  res.send(req.user);
});

router.post('/sign-out', async (req, res) => {
  const { error } = userSchemas.signOut.validate(req.body);
  if (error) throw error;

  await usersController.signOut(req.body);
  res.sendStatus(200);
});

module.exports = router;
