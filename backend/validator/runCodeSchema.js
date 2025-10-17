const Joi = require('joi');

const runCodeSchema = Joi.object({
    code: Joi.string().required(),
    language: Joi.string().required(),
    input: Joi.string().required(),
});

module.exports = runCodeSchema;