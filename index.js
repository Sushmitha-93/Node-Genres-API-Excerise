const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const mongoose = require("mongoose");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");
const error = require("./middlewares/error");

// Before we start the server - We must ensure below environment variable is set, otherwise exit
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: Env var vidly_jwtPrivateKey not set");
  process.exit(1);
}

//create server
const app = express();
app.use(express.json()); //parses body and return req.body
app.use("/api/genres", genres); // all routes starting with this will go to genres module
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
// Express "Error middleware" is defined after all the middlewares. When something fails
app.use(error);

//Connect to MongoDB 'vidlydb' database genres
mongoose
  .connect("mongodb://localhost/vidlydb", { useNewUrlParser: true })
  .then("Connected to MongoDB database...")
  .catch(err => console.log("Could not connect to MongoDB...", err));

//need to listen to port
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
