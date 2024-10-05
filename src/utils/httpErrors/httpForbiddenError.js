"use strict";

const HttpBaseError = require("./httpBaseError");
const { HTTP_STATUS_FORBIDDEN } = require("http2").constants;

module.exports = class HttpForbiddenError extends HttpBaseError {
  statusCode = HTTP_STATUS_FORBIDDEN;
};
