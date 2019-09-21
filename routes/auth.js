const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const { Users } = require("../models/user");

// This is a Login API
router.post("/", async function(req, res) {
  // Validate request
  const result = validateReqBody(res.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // If user has Registered - if user email is in db
  const user = await Users.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send("You are not registered. Please sign-up");

  // Authenticate user credentials
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");

  // Sending JWT
  const token = jwt.sign({ id: user._id }, config.get("jwtPrivateKey"));
  return res.send(token);
});

function validateReqBody(user) {
  const schema = {
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  };
  return joi.validate(user, schema);
}

module.exports = router;
