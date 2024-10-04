"use strict";

const Note = require("./noteModel");
const AppError = require("@src/utils/appError.js");

/**
 *
 * @param {object} query Sequelize query object
 * @param {number} userId to whom belongs all the notes
 * @returns {Array} Array of Sequelize note instances
 */
async function getUserNotes(query, userId) {
  const notes = await Note.findAll({
    where: { userId },
    limit: query.limit,
    offset: (query.page - 1) * query.limit,
    order: [[query.sortBy, query.sortDirection]],
  });

  if (!notes) {
    throw new AppError("Something went wrong trying to fetch notes.", 500);
  }

  return notes;
}

/**
 *
 * @param {number} noteId note id
 * @param {number} userId user id to whom belongs the note
 * @returns {object} created sequelize note instance
 */
async function getOneUserNote(noteId, userId) {
  const note = await Note.findOne({
    where: {
      userId,
      id: noteId,
    },
  });

  if (!note) {
    throw new AppError("Note with that id is not found.", 404);
  }

  return note;
}

/**
 *
 * @param {object} reqBody Object with req.body data
 * @param {number} userId note owner
 * @returns {object} created sequelize note instance
 */
async function createUserNote(reqBody, userId) {
  // could have used req.user with mixin - createNote, so I wouldnt have to pass merge body and userId as argument, but pass user instance
  const body = { ...reqBody, userId };

  const note = await Note.create(body, {
    fields: ["userId", "name", "description", "color"],
  });

  if (!note) {
    throw new AppError("Failed to create a note.", 500);
  }

  return note;
}

/**
 * Updates a note
 * @param {object} reqBody Object with req.body data
 * @param {number} noteId id of the note to be updated
 * @param {number} userId note owner
 */
async function updateUserNote(reqBody, noteId, userId) {
  const note = await Note.findOne({
    where: {
      userId: userId,
      id: noteId,
    },
  });

  if (!note) {
    throw new AppError("Note with that id is not found.", 404);
  }

  note.set(reqBody);

  return await note.save({ fields: ["name", "description", "color"] });
}

/**
 * Deletes user note from the database.
 * @param {number} userId note id to be deleted
 * @param {number} userId note owne
 */
async function deleteUserNote(noteId, userId) {
  await Note.destroy({
    where: {
      userId,
      id: noteId,
    },
  });

  return null;
}

module.exports = {
  getUserNotes,
  getOneUserNote,
  createUserNote,
  updateUserNote,
  deleteUserNote,
};
