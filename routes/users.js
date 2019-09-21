const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");

const { Users, validateUser } = require("../models/user");

router.post("/", auth, async (req, res) => {
  // validate client input
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // Check if email exists
  let email = await Users.findOne({ email: req.body.email });
  if (email) return res.status(400).send("User already registered!");

  // Save in database
  let user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  // Send response
  const token = user.generateJwtAuthToken();
  res.header("x-jwttoken", token).send(user);
});

module.exports = router;
