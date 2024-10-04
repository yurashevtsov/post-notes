"use strict";

const Note = require("./noteModel");

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

  return notes;
}

/**
 *
 * @param {number} noteId note id
 * @param {number} userId user id to whom belongs the note
 * @returns {object} created sequelize note instance
 */
async function getOneUserNote(noteId, userId) {
  return await Note.findOne({
    where: {
      userId,
      id: noteId,
    },
  });
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

  return note;
}

/**
 *
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
    throw new Error("Note with that id is not found.");
  }

  note.set(reqBody);

  return await note.save({ fields: ["name", "description", "color"] });
}

/**
 *
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
