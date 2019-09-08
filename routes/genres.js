const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const joi = require("@hapi/joi");

// const genres = [
//   { id: 1, name: "Action" },
//   { id: 2, name: "Romance" },
//   { id: 3, name: "Comedy" }
// ];

// 2. Create SCHEMA
const genresSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true }
});

// 3. Create MODEL class from Schema
const Genres = mongoose.model("genres", genresSchema);

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  //Check if id exists
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre ID does not exist");

  //Send requested genre
  res.send(genre);
});

router.post("/", (req, res) => {
  //validate client input i.e genre
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //push new genre and send res
  const genre = { id: genres.length + 1, name: req.body.genre };
  genres.push(genre);

  res.send(genre);
});

router.put("/:id", (req, res) => {
  //Check if id exists
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre ID does not exist");

  //Validate client input
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Update genre and send res
  genre.name = req.body.genre;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  //Check if id exists
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre ID does not exist");

  //Delete and send response
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

//Validate client genre input
function validateGenre(genre) {
  const schema = {
    genre: joi
      .string()
      .min(3)
      .required()
  };
  return joi.validate(genre, schema);
}

module.exports = router;
