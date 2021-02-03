const router = require('express').Router();
const transactionsController = require('../controllers/transactionsController');
const transactionSchemas = require('../schemas/transactionSchemas');

router.get('/', async (req, res) => {
  res.sendStatus(500);
});

router.post('/', async (req, res) => {
  const { error } = transactionSchemas.post.validate(req.body);
  if (error) throw error;
  const transaction = transactionsController.create(req.body);
  res.send(transaction);
});

module.exports = router;
