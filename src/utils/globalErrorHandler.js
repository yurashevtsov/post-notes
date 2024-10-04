/* eslint-disable no-unused-vars */
"use strict";

// todo: finish properly handling errors
function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  console.log(err.stack);

  res.status(err.statusCode).send(err.message);
}

module.exports = globalErrorHandler;
