"use strict";

const bcrypt = require("bcrypt");
/**
 *
 * @param {string} unhashedPasswordToCompare password provided by the user
 * @param {string} hashedPassword hashed password from DB
 * @returns {boolean} true - if password was correct, false - otherwise
 */
async function isValidPassword(unhashedPasswordToCompare, hashedPassword) {
  return await bcrypt.compare(unhashedPasswordToCompare, hashedPassword);
}

/**
 *
 * @param {string} password Expects a string
 * @returns {string} hashed password
 */
async function hashPassword(password, saltRounds = 12) {
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Encrypts password if it has been changed
 * @param {User} user The user instance
 * @param {Object} options sequelize options
 * @returns {Promise<void>}
 */

// eslint-disable-next-line no-unused-vars
async function encryptPasswordIfChanged(user, options) {
  if (user.changed("password") || user.isNewRecord) {
    user.password = await hashPassword(user.password);
  }
}

module.exports = {
  isValidPassword,
  hashPassword,
  encryptPasswordIfChanged,
};
