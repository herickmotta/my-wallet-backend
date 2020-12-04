const express = require('express');
const cors = require('cors');
const app = express();
const userController = require('./controllers/usersController');
const registerController = require('./controllers/registerController');
const authMiddleware = require('./middlewares/authMiddleware');
app.use(cors());
app.use(express.json());

//User routes
app.post('/api/users/sign-up',userController.postSignUp);
app.post('/api/users/sign-in',userController.postSignIn);
app.get('/api/users/',authMiddleware,userController.getUserInfo);


//Register routes
app.post('/api/new/',authMiddleware,registerController.postRegister);
app.get('/api/', authMiddleware, registerController.getUserRegisters);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
