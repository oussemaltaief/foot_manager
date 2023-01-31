const Joi = require('joi');

const string = () => Joi.string().trim();
const optionalString = () => string().allow('');
const color = () => string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
const date = Joi.date;
const optionalDate = () => date().allow(null);

module.exports = {
  string,
  optionalString,
  color,
  date,
  optionalDate,
  objectId: Joi.any,
  ref: Joi.ref,
  bool: Joi.bool,
  object: Joi.object,
  number: Joi.number,
  array: Joi.array,
  any: Joi.any
};
