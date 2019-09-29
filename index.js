const config = require("config");

//create server
const express = require("express");
const app = express();
require("./startup/routes")(app);

//Connect to MongoDB 'vidlydb' database genres
require("./startup/db")();

// Before we start the server - We must ensure below environment variable is set, otherwise exit
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: Env var vidly_jwtPrivateKey not set");
  process.exit(1);
}

//need to listen to port
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
