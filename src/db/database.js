"use strict";

const config = require("@config/index.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: config.dbHost,
  dialect: config.dbDialect,
  database: config.dbName,
  username: config.dbUser,
  password: config.dbPassword,
  port: config.dbPort,
});

async function init() {
  try {
    await sequelize.sync({ alter: true });

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

module.exports = {
  instance: sequelize,
  init,
};
