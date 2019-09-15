const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const fawn = require("fawn");
fawn.init(mongoose);

const { Rentals, validateRental } = require("../models/rental");
const { Movies } = require("../models/movie");
const { Customers } = require("../models/customer");

router.get("/", async (req, res) => {
  const rentals = await Rentals.find().sort("-rentedOn");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  // validate rental api req body
  const result = validateRental(req.body);
  if (result.error) res.status(400).send(result.error.details[0].message);

  // Check if movie exists
  const movie = await Movies.findById(req.body.movieId).catch(err => {});
  if (!movie) res.status(404).send("Invalid Movie..");

  // Check if customer exists
  const customer = await Customers.findById(req.body.customerId).catch(
    err => {}
  );
  if (!customer) res.status(404).send("Invalid Customer..");

  // Movies is in stock?
  if (movie.numberInStock === 0) res.status(400).send("Movie is out of stock!");

  // save rental document in rentals table
  let rental = new Rentals({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  // Save rental in rentals collection and also decrement numberInStock in movie in movies collection
  new fawn.Task()
    .save("rentals", rental)
    .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    .run()
    .then(res.send(rental))
    .catch(err => {
      res.status(500).send("Internal Server Error...");
    });
});

module.exports = router;
