const express = require('express');
const cors = require('cors');

const app = express();
const usersRouter = require('./routers/usersRouter');
const transactionsRouter = require('./routers/transactionsRouter');

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

module.exports = app;
