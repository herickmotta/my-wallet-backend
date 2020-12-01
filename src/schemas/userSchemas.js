const Joi = require('joi');

const signIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const signUp = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
    passwordConfirmation: Joi.ref('password'),
});

module.exports = {
    signIn,
    signUp
}