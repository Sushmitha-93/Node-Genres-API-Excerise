const mongoose = require("mongoose"); //for connecting to database
const joi = require("@hapi/joi"); //for validating client input sent in API

// 1. Connect to MongoDB in index.js
// 2. Create SCHEMA
// 3. Create MODEL class from Schema (only for saving/insert)
const Genres = mongoose.model(
  "genres",
  mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true }
  })
);

//Validate client genre input
function validateGenre(genre) {
  const schema = {
    name: joi
      .string()
      .min(3)
      .required()
  };
  return joi.validate(genre, schema);
}

exports.Genres = Genres;
exports.validateGenre = validateGenre;
