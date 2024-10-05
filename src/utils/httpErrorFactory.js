"use strict";

const { HttpBaseError, HttpInternalServerError, HttpBadRequestError } = require("./httpErrors")

const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = class HttpErrorFactory {
  /**
   * @param {Error} fromError
   * @returns {HttpBaseError}
   */
  static buildHttpError(fromError) {
    let result = null;
    if (fromError instanceof HttpBaseError) {
      result = fromError;
    }
    else { 
      switch (fromError.constructor) {
        case ValidationError: {
          result = new HttpBadRequestError(fromError.message);
          break;
        }
        case UniqueConstraintError: { 
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