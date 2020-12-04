const Joi = require('joi');
const joi = require('joi');

const register = Joi.object({
    value: Joi.string().pattern(new RegExp('^[0-9]+[\,\.]*[0-9]*$')).message('Value must be a number').required(),
    description: Joi.string().max(20).optional(),
    type: Joi.string().required(),
});

module.exports = {register};