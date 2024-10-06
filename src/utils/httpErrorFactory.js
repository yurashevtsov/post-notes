"use strict";

const {
  HttpBaseError,
  HttpInternalServerError,
  HttpBadRequestError,
  HttpForbiddenError,
} = require("./httpErrors");

const {
  ValidationError: SequelizeValidationError,
  UniqueConstraintError: SequelizeUniqueConstraintError,
} = require("sequelize");

const { ValidationError: JoiValidationError } = require("joi");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

module.exports = class HttpErrorFactory {
  /**
   * @param {Error} fromError
   * @returns {HttpBaseError}
   */
  static buildHttpError(fromError) {
    let result = null;
    if (fromError instanceof HttpBaseError) {
      result = fromError;
    } else {
      switch (fromError.constructor) {
        case SequelizeValidationError: {
          result = new HttpBadRequestError(fromError.message);
          break;
        }
        case SequelizeUniqueConstraintError: {
          result = new HttpBadRequestError(fromError.message);
          break;
        }
        case JoiValidationError: {
          result = new HttpBadRequestError(fromError.message);
          break;
        }
        case JsonWebTokenError: {
          result = new HttpBadRequestError(fromError.message);
          break;
        }
        case TokenExpiredError: {
          result = new HttpForbiddenError(fromError.message);
          break;
        }
        default: {
          result = new HttpInternalServerError(fromError.message);
        }
      }
    }

    return result;
  }
};
