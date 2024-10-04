"use strict";

const { instance: sequelizeInstance } = require("@src/db/database.js");
const { Model, DataTypes } = require("sequelize");
const passwordService = require("@src/auth/password.service.js");

class User extends Model {
  toJSON() {
    const values = Object.assign({}, this.get());
    Reflect.deleteProperty(values, "password");
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: "username",
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: "email",
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "user",
    tableName: "users",
    timestamps: true,
    updatedAt: true,
    createdAt: false,
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
  }
);

// hash password before saving
User.addHook("beforeSave", passwordService.encryptPasswordIfChanged);

module.exports = User;
