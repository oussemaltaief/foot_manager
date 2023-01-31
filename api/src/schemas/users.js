const Joi = require('./utils/joi');
const { USER_TYPES, GENDER } = require('../constants');

const type = Joi.string()
  .valid(USER_TYPES.ALL)
  .required();

const gender = Joi.string()
  .valid(GENDER.ALL)
  .required();

module.exports = {
  create: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    photo: Joi.optionalString(),
    type,
    gender
  }),
  update: Joi.object({
    username: Joi.string().required(),
    password: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    photo: Joi.optionalString(),
    type,
    gender
  })
};
