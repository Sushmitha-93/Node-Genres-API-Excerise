const express = require("express");
const router = express.Router();

const { Movies, validateMovie } = require("../models/movie");
const { Genres } = require("../models/genre");

router.get("/", async (req, res) => {
  const movies = await Movies.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movies.findById(req.params.id).catch(err => {
    // to catch error caused when invalid mongoID format is requested
  });
  if (!movie) res.status(404).send("Movie ID does not exist");
  res.send(movie);
});

router.post("/", async (req, res) => {
  // Validate request body
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // Check if genre ID exists
  const genre = await Genres.findById(req.body.genreId).catch(err => {});
  if (!genre) res.status(400).send("Invalid Genre..");

  // Save Movie with Genre information
  const movie = new Movies({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  // validate the request body
  const result = validateMovie(req.body);
  if (result.error) res.status(400).send(result.error.details[0].message);

  // check if movie exists
  const movie = await Movies.findById(req.params.id).catch(err => {});
  if (!movie) res.status(404).send("Movie does not exist");

  // Check if genre is changed
  if (req.param.genreId != movie.genre._id) {
    const genre = await Genres.findById(req.body.genreId).catch(err => {});
    if (!genre) res.status(400).send("Invalid Genre...");
    movie.genre._id = genre._id;
    movie.genre.name = genre.name;
  }

  // update the same movie object and save
  movie.title = req.body.title;
  movie.numberInStock = req.body.numberInStock;
  movie.dailyRentalRate = req.body.dailyRentalRate;
  const updatedMovie = await movie.save();
  res.send(updatedMovie);
});

module.exports = router;
