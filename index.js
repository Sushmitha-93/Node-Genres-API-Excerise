const { logger } = require("./logger.js"); // 5) Require logger to log any errors

//create server
const express = require("express");
const app = express(); // 1) Create server instance
require("./startup/routes")(app); // requiring all app.use, pass "app" to it as function parameter

// 2) Connect to MongoDB 'vidlydb' database genres
require("./startup/db")();

// 3) Before we start the server - We must ensure below environment variable is set, otherwise exit
require("./startup/config")();

// 4) need to listen to port
const port = process.env.port || 3000;
const server = app.listen(port, () => logger.info(`Listening to port ${port}`));

module.exports = server;
