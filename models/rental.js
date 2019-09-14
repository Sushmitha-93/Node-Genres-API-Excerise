const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const rentalSchema = mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true },
      phone: { type: Number, required: true },
      isGold: { type: Boolean, default: false }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      }
    }),
    require: true
  },
  rentedOn: { type: Date, default: Date.now(), required: true },
  returnedOn: { type: Date },
  rentalFee: { type: Number, min: 0 }
});
// Create model for Rental schema
const Rentals = mongoose.model("rentals", rentalSchema);

// Validation for request body
function validateRental(rental) {
  const schema = {
    customerId: joi
      .string()
      .min(2)
      .required(),
    movieId: joi
      .string()
      .max(25)
      .required()
  };
  return joi.validate(rental, schema);
}

exports.Rentals = Rentals;
exports.validateRental = validateRental;
