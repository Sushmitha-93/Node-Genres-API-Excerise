const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middlewares/error");

module.exports = function(app) {
  app.use(express.json()); //parses body and return req.body
  app.use("/api/genres", genres); // all API requests starting with this will go to genres module
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  // Express "Error middleware" is defined after all the middlewares. When something fails
  app.use(error); // Error middleware
};
