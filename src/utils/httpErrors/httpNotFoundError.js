"use strict";

const { HTTP_STATUS_NOT_FOUND } = require("http2").constants;
const HttpBaseError = require("./httpBaseError");

module.exports = class httpNotFoundError extends HttpBaseError {
  statusCode = HTTP_STATUS_NOT_FOUND;
};
