"use strict";
const HttpErrorFactory = require("./httpErrorFactory");
const config = require("@src/config");

// eslint-disable-next-line no-unused-vars
function globalErrorHandler(err, req, res, next) {
  const actualHttpError = HttpErrorFactory.buildHttpError(err);

  if (config.nodeEnv === "development") {
    devErrorHandler(actualHttpError, err, res);
  } else {
    prodErrorHandler(actualHttpError, res);
  }
  // res.status(actualHttpError.statusCode).send(actualHttpError.message);
}

// for development purposes, I want to see original error
function devErrorHandler(appErr, originalErr, res) {
  console.log(originalErr);

  res.status(appErr.statusCode).send(appErr.message);
}

function prodErrorHandler(appErr, res) {
  res.status(appErr.statusCode).send(appErr.message);
}

module.exports = globalErrorHandler;
