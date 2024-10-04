"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const noteService = require("./note.service");

async function getAllNotes(req, res) {
  const allNotes = await noteService.getUserNotes(req.query, req.user.id);

  res.status(200).send(allNotes);
}

// using req.user.id to find note belongs to an authorized user
async function getOneNote(req, res) {
  res
    .status(200)
    .send(await noteService.getOneUserNote(req.params.id, req.user.id));
}

async function createNote(req, res) {
  const newNote = await noteService.createUserNote(req.body, req.user.id);

  res.status(201).send(newNote);
}

async function updateNote(req, res) {
  const updatedNote = await noteService.updateUserNote(
    req.body,
    req.params.id,
    req.user.id
  );

  res.status(200).send(updatedNote);
}

async function deleteNote(req, res) {
  await noteService.deleteUserNote(req.params.id, req.user.id);

  res.status(204).send();
}

module.exports = {
  getAllNotes: catchAsync(getAllNotes),
  getOneNote: catchAsync(getOneNote),
  createNote: catchAsync(createNote),
  updateNote: catchAsync(updateNote),
  deleteNote: catchAsync(deleteNote),
};
