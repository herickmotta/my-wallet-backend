/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
require('express-async-errors');

const app = express();
const { ValidationError } = require('joi');
const usersRouter = require('./routers/usersRouter');
const transactionsRouter = require('./routers/transactionsRouter');
const authMiddleware = require('./middlewares/authMiddleware');
const NotFoundError = require('./errors/NotFoundError');
const UnauthorizedError = require('./errors/UnauthorizedError');

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', authMiddleware, transactionsRouter);

app.use((error, req, res, next) => {
  console.log(error);
  if (error instanceof ValidationError) {
    return res.status(422).send(error.message);
  }
  if (error instanceof NotFoundError) {
    return res.status(404).send(error.message);
  }
  if (error instanceof UnauthorizedError) {
    return res.status(401).send(error.message);
  }
  return res.status(500).send(error.message);
});
module.exports = app;
