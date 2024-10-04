"use strict";

const jwt = require("jsonwebtoken");
const config = require("@config/index.js");
const { promisify } = require("util");
const packageJson = require("../../package.json");

function encodeToken(id) {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
    issuer: packageJson.name,
    audience: packageJson.name,
  });
}

async function decodeToken(token) {
  return await promisify(jwt.verify)(token, config.jwtSecret);
}

module.exports = {
  encodeToken,
  decodeToken
};
