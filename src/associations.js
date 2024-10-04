"use strict";

const User = require("@src/user/userModel.js");
const Note = require("@src/note/noteModel.js");

User.hasMany(Note);
Note.belongsTo(User);
