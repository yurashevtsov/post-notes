"use strict";

const Joi = require("joi");

const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  avatar: Joi.string().min(5).max(30),
});

const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.any().forbidden(),
  password: Joi.string().min(4).required(),
  avatar: Joi.string().min(5).max(30),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
  idParamSchema,
};
