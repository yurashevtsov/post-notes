"use strict";

const User = require("./userModel");
const {
  HttpNotFoundError,
  HttpBadRequestError,
} = require("@src/utils/httpErrors");
/**
 *Returns an array with 2 values. 
  First value is found or created user. 
  Second value is a boolean indicating whether the user was created or not
 * @param {*} reqBody req.body object
 * @returns {array} array [user, created]
 */
async function createUser(reqBody) {
  const [user, created] = await User.findOrCreate({
    where: {
      email: reqBody.email,
    },
    defaults: reqBody,
  });

  if (!created) {
    throw new HttpBadRequestError("User with that email already exists.");
  }

  return user;
}

// not throwing errors here, auth middleware will do
async function getUserByEmailWithPassword(userEmail) {
  const user = await User.findOne({
    attributes: {
      include: ["password"],
    },
    where: {
      email: userEmail,
    },
  });

  return user;
}

// not throwing errors here, auth middleware will do
async function getUserByUsernameWithPassword(username) {
  const user = await User.findOne({
    attributes: {
      include: ["password"],
    },
    where: {
      username: username,
    },
  });

  return user;
}

async function getUserById(userId) {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new HttpNotFoundError("User is not found.");
  }

  return user;
}

async function getAllUsers() {
  const users = await User.findAll();

  return users;
}

// we dont allow to change email address in this route
async function updateUserById(userId, userData, ...allowedFields) {
  const user = await getUserById(userId);

  if (!user) {
    throw new HttpNotFoundError("User is not found.");
  }

  user.set(userData);

  return await user.save({
    fields: allowedFields,
  });
}

async function deleteUserById(userId) {
  await User.destroy({
    where: {
      id: userId,
    },
  });

  return null;
}

module.exports = {
  createUser,
  getUserByEmailWithPassword,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserByUsernameWithPassword,
};
