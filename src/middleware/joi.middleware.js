"use strict";

const Joi = require("joi");

module.exports = {
  /**
   * Validates req[key] with Joi schema
   * @param {Joi.ObjectSchema} schema joi schema object
   * @param {*} key req[key], defaut is body (so it validates req.body)
   * @returns
   */
  validateJoiSchema(schema, key = "body") {
    return async function (req, res, next) {
      try {
        await schema.validateAsync(req[key]);

        next();
      } catch (err) {
        next(err);
      }
    };
  },

  /**
   * Mutates req.query after validating against Joi schema object
   * @param {*} schema  joi schema object
   * @returns
   */
  validateAndMutateQuery(schema) {
    return async function (req, res, next) {
      try {
        req.query = await Joi.attempt(req.query, schema);

        next();
      } catch (err) {
        next(err);
      }
    };
  },
};
