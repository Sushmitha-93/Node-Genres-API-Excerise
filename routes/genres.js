const express = require("express"); //for create API
const router = express.Router(); // do module.exports = router

const authMidware = require("../middlewares/auth");
const adminMidware = require("../middlewares/admin");
const { logger } = require("../logger");

const { Genres, validateGenre } = require("../models/genre"); // requiring Genre model(step 3)

require("express-async-errors");

process.on("unhandledRejection", ex => {
  throw ex; // Thow exception so that Winston will handle and log it
});

// 1. Connect to MongoDB in index.js
// 2. Create SCHEMA
// 3. Create MODEL class from Schema (to call mongoose functions to find,save,update,delete)

router.get("/", async (req, res, next) => {
  // throw new Error("Cannot get genres");
  const genres = await Genres.find();
  res.send(genres);
});

//throw new Error("Somthing failed on start up"); //outside routers

// const p = Promise.reject("Somthing failed.. Promise Rejected!");
// p.then(() => console.log("Done"));

router.get("/:id", async (req, res) => {
  //Check if id exists
  const genre = await Genres.findById(req.params.id).catch(err => {
    //  catch Invlid id format error. Because it thorows Type cast error if ID is not of MongoDB format.
  });
  if (!genre) return res.status(404).send("Genre ID does not exist");

  //Send requested genre
  res.send(genre);
});

// CREATE NEW GENRE (Admin Feature)
router.post("/", authMidware, adminMidware, async (req, res) => {
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
  //Validate client input
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Update genre and send res
  let genre = await Genres.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name }
    },
    { new: true, useFindAndModify: false }
  ).catch(err => {
    // Catch type cast error if ID given to API is in wrong format
  });
  if (!genre) return res.status(404).send("Genre ID does not exist");
  res.send(genre);
});

// DELETEING GENRE (Admin Feature)
router.delete("/:id", authMidware, adminMidware, async (req, res) => {
  //Check if id exists
  let genre = await Genres.findByIdAndDelete(req.params.id).catch(err => {
    //  catch Invlid id format error. Because it thorows Type cast error if ID is not of MongoDB format
  });
  if (!genre) return res.status(404).send("Genre ID does not exist");

  res.send(genre);
});

module.exports = router;
