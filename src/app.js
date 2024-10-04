"use strict";

const express = require("express");
const app = express();
const userRouter = require("@src/user/userRouter.js");
const noteRouter = require("@src/note/noteRouter.js");
// body parser
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

// eslint-disable-next-line no-unused-vars
app.all("*", (req, res, next) => {
  res.status(404).send({
    message: `${req.originalUrl} is not found on this server`,
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
