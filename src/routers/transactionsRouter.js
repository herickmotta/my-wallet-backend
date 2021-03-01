const router = require('express').Router();
const transactionsController = require('../controllers/transactionsController');
const transactionSchemas = require('../schemas/transactionSchemas');

router.get('/:id', async (req, res) => {
  const transactions = await transactionsController.getByUserId(req.user.id);
  res.send(transactions);
});

router.post('/new/:type', async (req, res) => {
  const { error } = transactionSchemas.post.validate(req.body);
  if (error) throw error;
  const transactionParams = {
    ...req.body,
    type: req.params.type,
    userId: req.user.id,
  };
  const transaction = transactionsController.create(transactionParams);
  res.status(201).send(transaction);
});

module.exports = router;
