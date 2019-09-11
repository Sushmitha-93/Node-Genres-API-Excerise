const joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Customers = mongoose.model(
  "customers",
  mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    isGold: Boolean
  })
);

function validateCustomer(customer) {
  const schema = {
    name: joi.string().required(),
    phone: joi.string().required()
  };
  return joi.validate(customer, schema);
}

exports.Customers = Customers;
exports.validateCustomer = validateCustomer;
