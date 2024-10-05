"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const jwtService = require("./jwt.service");
const userService = require("@src/user/userService.js");
const passwordService = require("./password.service.js");
const {
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpForbiddenError,
} = require("@src/utils/httpErrors/index.js");

// Authenticate by JWT TOKEN
async function tokenAuthHandler(req, res, next) {
  // so, assuming : req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  // get the token
  const token = req.headers.authorization.split(" ")[1];

  // just for a good measure
  if (!token) {
    return next(new HttpUnauthorizedError("Unauthorized"));
  }

  // decode the token
  const payload = await jwtService.decodeToken(token);
  // check if token is expired = handled by the library

  // check if user exists in the database
  const user = await userService.getUserById(payload.id);

  if (!user) {
    next(new HttpForbiddenError("User no longer exists.Log in again."));
  }

  // because jwt library uses seconds, not milliseconds
  const tokenIssuedAt = payload.iat * 1000;
  // converting date to a milliseconds timestamp
  const userUpdatedAt = user.updatedAt.getTime();

  if (userUpdatedAt > tokenIssuedAt) {
    next(
      new HttpForbiddenError("User recently changed password.Log in again.")
    );
  }

  // attach user to a request
  req.user = user;

  // if everything is fine, continue to the next middleware or route handler
  next();
}

// Authenticate by BASIC Auth
async function basicAuthHandler(req, res, next) {
  // assuming that - req.headers.authorization && req.headers.authorization.startsWith("Basic")
  const [username, password] = Buffer.from(
    req.headers.authorization.split(" ")[1],
    "base64"
  )
    .toString()
    .split(":");

  // check if user exists
  const user = await userService.getUserByUsernameWithPassword(username);
  if (
    !user ||
    !(await passwordService.isValidPassword(password, user.password))
  ) {
    return next(new HttpBadRequestError("Invalid username or password"));
  }

  req.user = user;

  // if no errors thrown then request may pass
  next();
}

async function protectHandler(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Basic")
  ) {
    return await basicAuthHandler(req, res, next);
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return await tokenAuthHandler(req, res, next);
  }

  // will reach it if no authentication info was provided
  res.setHeader("WWW-Authenticate", "Basic");
  res.status(401).send("Unauthenticated");
}

module.exports = {
  // protect: catchAsync(protect), // JWT ONLY
  protectHandler: catchAsync(protectHandler),
};

// FOR A REFERENCE
// JWT only authentication
// async function protect(req, res, next) {
//   // get the token
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return next(new Error("Unauthorized"));
//   }

//   // decode the token
//   const payload = await jwtService.decodeToken(token);
//   // check if token is expired = handled by the library

//   // check if user exists in the database
//   const user = await userService.getUserById(payload.id);

//   if (!user) {
//     return next(new Error("User is no longer exists.Log in again."));
//   }

//   // because jwt library uses seconds, not milliseconds
//   const tokenIssuedAt = payload.iat * 1000;
//   // converting date to a milliseconds timestamp
//   const userUpdatedAt = user.updatedAt.getTime();

//   if (userUpdatedAt > tokenIssuedAt) {
//     return next(
//       new Error("User recently changed password. Please, log in again.")
//     );
//   }

//   // attach user to a request
//   req.user = user;

//   // if everything is fine, continue to the next middleware or route handler
//   next();
// }
