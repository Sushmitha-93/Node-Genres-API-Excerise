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
// 3. Create MODEL class from Schema
const Genres = mongoose.model(
  "genres",
  mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true }
  })
);

router.get("/", async (req, res) => {
  const genres = await Genres.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  //Check if id exists
  const genre = await Genres.findById(req.params.id).catch(err => {
    return res.status(404).send("Genre ID does not exist - Invlid id");
  });
  if (!genre) return res.status(404).send("Genre ID does not exist");

  //Send requested genre
  res.send(genre);
});

router.post("/", async (req, res) => {
  //validate client input i.e genre
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //save new genre and send res
  let genre = new Genres({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  //Check if id exists
  let genre = await Genres.findById(req.params).catch(err =>
    res.status(404).send("Genre ID does not exist - Invlid id")
  );
  if (!genre) return res.status(404).send("Genre ID does not exist");

  //Validate client input
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Update genre and send res
  genre = await Genres.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name }
    },
    { new: true }
  );
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  //Check if id exists
  let genre = await Genres.findByIdAndDelete(req.params.id).catch(err =>
    res.status(404).send("Genre ID does not exist - Invlid id")
  );
  if (!genre) return res.status(404).send("Genre ID does not exist");

  //Delete and send response
  // genre = await Genres.findByIdAndDelete(req.params.id);

  res.send(genre);
});

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

module.exports = router;
