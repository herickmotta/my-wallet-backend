const Joi = require('joi');

const post = Joi.object({
  value: Joi.number().required(),
  description: Joi.string().max(20).optional(),
});

module.exports = { post };
