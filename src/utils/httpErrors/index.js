"use strict";

const HttpBaseError = require("./httpBaseError");
const HttpInternalServerError = require("./httpInternalServerError");
const HttpBadRequestError = require("./httpBadRequestError");
const HttpUnauthorizedError = require("./httpUnauthorizedError");
const HttpForbiddenError = require("./httpForbiddenError");
const HttpNotFoundError = require("./httpNotFoundError");

module.exports = {
  HttpInternalServerError,
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpBaseError,
  HttpForbiddenError,
  HttpNotFoundError,
};
