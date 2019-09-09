const express = require("express");
const router = express.Router(); // module.exports = router
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

// Get API for all
router.get("/", async (req, res) => {
  const customers = await Customers.find();
  res.send(customers);
});

// Get by ID API
router.get("/:id", async (req, res) => {
  const customer = await Customers.findById(req.params.id).catch(err => {});
  if (!customer) res.status(404).send("Customer ID does not exist");
  res.send(customer);
});

// POST API
router.post("/", async (req, res) => {
  // Validate customer information sent in API
  const result = validateCustomer(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // Save in MongoDB
  let customer = new Customers({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();

  res.send(customer);
});

// PUT API by ID
router.put("/:id", async (req, res) => {
  // validate client input through API
  const result = validateCustomer(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // Update by ID in MongoDB
  let customer = await Customers.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
      }
    },
    { new: true, useFindAndModify: false }
  ).catch(err => {});
  if (!customer) res.status(404).send("Customer ID does not exist");
  res.send(customer);
});

// DELETE API by ID
router.delete("/:id", async (req, res) => {
  let customer = await Customers.findByIdAndDelete(req.params.id).catch(
    err => {}
  );
  if (!customer) res.status(404).send("Customer ID does not exist");

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    name: joi.string().required(),
    phone: joi.string().required()
  };
  return joi.validate(customer, schema);
}

module.exports = router;
