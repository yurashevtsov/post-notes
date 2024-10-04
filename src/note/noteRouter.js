"use strict";

const routerInstance = require("express").Router({ mergeParams: true });
const noteController = require("./noteController");
const authorizationMiddleware = require("@src/auth/authorization.middleware.js");
const joiMiddleware = require("@src/middleware/joi.middleware.js");
const {
  createNoteSchema,
  updateNoteSchema,
  paginationSchema,
  idParamSchema,
} = require("./noteValidateSchema.js");

// All routes below this middleware will require user authentication (protected by authorizationMiddleware.protect)
// routerInstance.use(authorizationMiddleware.protect); // JWT only
routerInstance.use(authorizationMiddleware.protectHandler); // JWT/basic authentication

// validating id parameter for any path that has req.params.id
routerInstance.param(
  "id",
  joiMiddleware.validateJoiSchema(idParamSchema, "params")
);

// BASE ROUTES

routerInstance.get(
  "/",
  joiMiddleware.validateAndMutateQuery(paginationSchema),
  noteController.getAllNotes
);

routerInstance.get("/:id", noteController.getOneNote);

routerInstance.post(
  "/",
  joiMiddleware.validateJoiSchema(createNoteSchema),
  noteController.createNote
);

routerInstance.put(
  "/:id",
  joiMiddleware.validateJoiSchema(updateNoteSchema),
  noteController.updateNote
);

routerInstance.delete("/:id", noteController.deleteNote);

module.exports = routerInstance;
