"use strict";

/** @abstract */
class HttpBaseError extends Error {
  // message = "";
  statusCode = 0;
  constructor(...args) {
    super(...args);
    if (this.constructor === HttpBaseError) {
      throw new Error("Can't directly instance abstract class HttpBaseError");
    }
  }
}

module.exports = HttpBaseError;
