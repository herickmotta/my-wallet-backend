const express = require('express');
const cors = require('cors');
const app = express();
const userController = require('./controllers/usersController');
app.use(cors());
app.use(express.json());

//User routes
app.post('/api/users/sign-up',userController.postSignUp);
app.post('/api/users/sign-in',userController.postSignIn);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
