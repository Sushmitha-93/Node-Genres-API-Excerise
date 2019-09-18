const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const mongoose = require("mongoose");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");

//create server
const app = express();
app.use(express.json()); //parses body and return req.body
app.use("/api/genres", genres); // all routes starting with this will go to genres module
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

//Connect to MongoDB 'vidlydb' database genres
mongoose
  .connect("mongodb://localhost/vidlydb", { useNewUrlParser: true })
  .then("Connected to MongoDB database...")
  .catch(err => console.log("Could not connect to MongoDB", err));

//need to listen to port
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
