"use strict";

const HttpBaseError = require("./httpBaseError");
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require("http2").constants;

module.exports = class HttpInternalServerError extends HttpBaseError {
  statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR;
};