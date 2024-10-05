"use strict";
const HttpErrorFactory = require("./httpErrorFactory");

// todo: finish properly handling errors
function globalErrorHandler(err, req, res) {
  const actualHttpError = HttpErrorFactory.buildHttpError(err);

  res.status(actualHttpError.statusCode).send(actualHttpError.message);
}

module.exports = globalErrorHandler;
