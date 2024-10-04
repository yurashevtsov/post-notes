"use strict";

const Joi = require("joi");

const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(100),
  sortBy: Joi.string()
    .valid("name", "description", "color", "createdAt")
    .default("createdAt"),
  sortDirection: Joi.string().valid("asc", "desc").default("desc"),
});

const createNoteSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  color: Joi.string(),
  // userId: Joi.number().integer().required(),
});

const updateNoteSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  color: Joi.string(),
  // no need to validate userId as it comes from auth middleware, could have attached it as part of req.query object to validate
  // userId: Joi.number().integer().required(),
});

module.exports = {
  updateNoteSchema,
  createNoteSchema,
  paginationSchema,
  idParamSchema,
};
