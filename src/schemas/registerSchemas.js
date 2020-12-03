const Joi = require('joi');
const joi = require('joi');

const register = Joi.object({
    value: Joi.string().pattern(new RegExp('^[0-9]+[\,]*[0-9]*$')).required(),
    description: Joi.string().max(20),
    type: Joi.string().required(),
    user_id: Joi.number()
});

module.exports = {register};