"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const jwtService = require("@src/auth/jwt.service.js");
const passwordService = require("@src/auth/password.service.js");
const userService = require("./userService.js");
const AppError = require("@src/utils/appError.js");

async function signup(req, res) {
  const user = await userService.createUser(
    req.body,
    "username",
    "email",
    "password",
    "avatar"
  );

  const token = jwtService.encodeToken(user.id);

  res.status(201).send({
    user,
    token,
  });
}

async function login(req, res, next) {
  const user = await userService.getUserByEmailWithPassword(req.body.email);

  if (
    !user ||
    !(await passwordService.isValidPassword(req.body.password, user.password))
  ) {
    return next(new AppError("Invalid credentials", 403));
  }

  const token = jwtService.encodeToken(user.id);

  res.status(200).send({
    user,
    token,
  });
}

async function getAllUsers(req, res) {
  res.status(200).send(await userService.getAllUsers());
}

async function getOneUser(req, res) {
  res.status(200).send(await userService.getUserById(req.params.id));
}

async function createOneUser(req, res) {
  res.status(201).send(await userService.createUser(req.body));
}

async function updateUser(req, res) {
  const updatedUser = await userService.updateUserById(
    req.params.id,
    req.body,
    "username",
    "password",
    "avatar"
  );

  res.status(200).send(updatedUser);
}

async function deleteUser(req, res) {
  await userService.deleteUserById(req.params.id);

  res.status(204).send();
}

module.exports = {
  signup: catchAsync(signup),
  login: catchAsync(login),
  getAllUsers: catchAsync(getAllUsers),
  getOneUser: catchAsync(getOneUser),
  createOneUser: catchAsync(createOneUser),
  updateUser: catchAsync(updateUser),
  deleteUser: catchAsync(deleteUser),
};
