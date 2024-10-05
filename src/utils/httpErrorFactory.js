"use strict";

const {
  HttpBaseError,
  HttpInternalServerError,
  HttpBadRequestError,
} = require("./httpErrors");

const {
  ValidationError: SequelizeValidationError,
  UniqueConstraintError: SequelizeUniqueConstraintError,
} = require("sequelize");

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
        default: {
          result = new HttpInternalServerError(fromError.message);
        }
      }
    }

    return result;
  }
};
