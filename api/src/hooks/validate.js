const validateSchema = require('feathers-hooks-validate-joi');

const opts = { abortEarly: false, allowUnknown: true, convert: true };

module.exports = schema => validateSchema.form(schema, opts);
