const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const { genreSchema } = require("./genre");

// Connect to mongoDB
// Define Schema
// create model

// Define validation function for client input through API

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Movies = mongoose.model("movies", movieSchema);

//Validate request body
function validateMovie(movie) {
  const schema = {
    title: joi
      .string()
      .min(3)
      .max(50)
      .required(),
    genreId: joi.string().required(),
    numberInStock: joi
      .number()
      .min(0)
      .required(),
    dailyRentalRate: joi
      .number()
      .min(0)
      .required()
  };
  return joi.validate(movie, schema);
}

exports.movieSchema = movieSchema;
exports.Movies = Movies;
exports.validateMovie = validateMovie;
