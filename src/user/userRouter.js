"use strict";

const routerInstance = require("express").Router({ mergeParams: true });
const userController = require("./userController");
const authorizationMiddleware = require("@src/auth/authorization.middleware.js");
const joiMiddleware = require("@src/middleware/joi.middleware.js");
const {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
  loginUserSchema,
} = require("./userValidateSchema.js");

// validating id parameter for any path that has req.params.id
routerInstance.param(
  "id",
  joiMiddleware.validateJoiSchema(idParamSchema, "params")
);

// BASE ROUTES

routerInstance.post(
  "/signup",
  joiMiddleware.validateJoiSchema(createUserSchema),
  userController.signup
);
routerInstance.post(
  "/login",
  joiMiddleware.validateJoiSchema(loginUserSchema),
  userController.login
);

// for authorized users only, will be applied to all routes below
// routerInstance.use(authorizationMiddleware.protect); // JWT Only authorization
routerInstance.use(authorizationMiddleware.protectHandler); // JWT/basic authentication

routerInstance.get("/", userController.getAllUsers);

routerInstance.get("/:id", userController.getOneUser);

routerInstance.post(
  "/",
  joiMiddleware.validateJoiSchema(createUserSchema),
  userController.createOneUser
);

routerInstance.put(
  "/:id",
  joiMiddleware.validateJoiSchema(updateUserSchema),
  userController.updateUser
);

routerInstance.delete("/:id", userController.deleteUser);

module.exports = routerInstance;
