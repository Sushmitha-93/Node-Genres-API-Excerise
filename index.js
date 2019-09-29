const mongoose = require("mongoose");
const config = require("config");

//create server
const express = require("express");
const app = express();
require("./startup/routes")(app);

// Before we start the server - We must ensure below environment variable is set, otherwise exit
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: Env var vidly_jwtPrivateKey not set");
  process.exit(1);
}

//Connect to MongoDB 'vidlydb' database genres
mongoose
  .connect("mongodb://localhost/vidlydb", { useNewUrlParser: true })
  .then("Connected to MongoDB database...")
  .catch(err => console.log("Could not connect to MongoDB...", err));

//need to listen to port
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
