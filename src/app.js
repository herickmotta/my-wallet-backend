const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

//User routes
app.post('/api/users/sign-up',userController.postSignUp);
app.post('/api/users/sign-in',userController.postSignIn);