'use strict';
var Joi = require('joi');

module.exports = {
  options: { flatten: true },
  body: {
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required().min(6),
    confirm_password: Joi.string().valid(Joi.ref('password')).required().options({ language: {any: {allowOnly: 'must match password' }}})
  }
};
