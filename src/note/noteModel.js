"use strict";

const { instance: sequelizeInstance } = require("@src/db/database.js");
const { Model, DataTypes } = require("sequelize");

class Notes extends Model {}

Notes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "yellow",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "note",
    tableName: "notes",
    timestamps: true,
  }
);

module.exports = Notes;
