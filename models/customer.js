const joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Customers = mongoose.model(
  "customers",
  mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    isGold: { type: Boolean, default: false }
  })
);

function validateCustomer(customer) {
  const schema = {
    name: joi.string().required(),
    phone: joi.string().required(),
    isGold: joi.boolean()
  };
  return joi.validate(customer, schema);
}

exports.Customers = Customers;
exports.validateCustomer = validateCustomer;
