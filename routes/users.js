const express = require("express");
const router = express.Router();

const { Users, validateUser } = require("../models/user");

router.post("/", async (req, res) => {
  // validate client input
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // Check if email exists
  const email = await Users.find({ email: req.body.email });
  if (email) return res.status(400).send("User already registered!");

  // Save in database
  let user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user = await user.save();

  // Send response
  res.send(user);
});

module.exports = router;
