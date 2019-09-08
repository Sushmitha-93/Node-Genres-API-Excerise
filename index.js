const express = require("express");
const genres = require("./routes/genres");
const mongoose = require("mongoose");

//create server
const app = express();
app.use(express.json()); //parses body and return req.body
app.use("/api/genres", genres); // all routes starting with this will go to genres module

//Connect to MongoDB database genres
mongoose
  .connect("mongodb://localhost/vidlydb")
  .then("Connected to MongoDB database...")
  .catch(err => console.log("Could not connect to MongoDB", err));

//need to listen to port
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
