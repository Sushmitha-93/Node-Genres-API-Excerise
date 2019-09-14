const express = require("express");
const router = express.Router();

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
  rental = await rental.save();

  // Decrement stock of that movie
  movie.numberInStock--;
  movie.save();

  res.send(rental);
});

module.exports = router;
