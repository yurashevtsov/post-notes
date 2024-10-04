"use strict";

const express = require("express");
const app = express();
const userRouter = require("@src/user/userRouter.js");
const noteRouter = require("@src/note/noteRouter.js");
const AppError = require("@src/utils/appError.js");
const globalErrorHandler = require("@src/utils/globalErrorHandler.js");
// body parser
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

// 404 route handler, if route is not found, it will
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} is not found on this server`, 404));
});

// handler with 4 arguments tells express its error first error handler
app.use(globalErrorHandler);

module.exports = app;
