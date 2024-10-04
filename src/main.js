"use strict";

require("module-alias/register");
require("@src/db/associations.js");
const config = require("@config/index.js");
const app = require("./app");
const db = require("@src/db/database.js");

db.init();

app.listen(config.serverPort, () => {
  console.log(`Server is running on port ${config.serverPort}`);
});
