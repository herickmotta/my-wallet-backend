const express = require('express');
const cors = require('cors');

const app = express();
const userController = require('./controllers/usersController');
const registerController = require('./controllers/registerController');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(cors());
app.use(express.json());

// User routes
app.post('/api/users/sign-up', userController.postSignUp);
app.post('/api/users/sign-in', userController.postSignIn);
app.get('/api/users/', authMiddleware, userController.getUserInfo);
app.post('/api/users/sign-out', authMiddleware, userController.postSignOut);

// Register routes
app.post('/api/registers/new', authMiddleware, registerController.postRegister);
app.get('/api/registers', authMiddleware, registerController.getUserRegisters);

module.exports = app;
