"use strict";

const User = require("./userModel");

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
    throw new Error("User with that email already exists.");
  }

  return user;
}

async function getUserByEmailWithPassword(userEmail) {
  return await User.findOne({
    attributes: {
      include: ["password"],
    },
    where: {
      email: userEmail,
    },
  });
}

async function getUserByUsernameWithPassword(username) {
  return await User.findOne({
    attributes: {
      include: ["password"],
    },
    where: {
      username: username,
    },
  });
}

async function getUserById(userId) {
  return await User.findOne({
    where: {
      id: userId,
    },
  });
}

async function getAllUsers() {
  return await User.findAll();
}

// we dont allow to change email address in this route
async function updateUserById(userId, userData, ...allowedFields) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User with that id is not found.");
  }

  user.set(userData);

  return await user.save({
    fields: allowedFields,
  });
}

async function deleteUserById(userId) {
  return await User.destroy({
    where: {
      id: userId,
    },
  });
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
