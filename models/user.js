const mongoose = require("mongoose");
const joi = require("@hapi/joi");

// Connect to mongoDB in index
// create Schema
// create model to call functions
// create validation function to validate client input to api
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024
  }
});

// Create user model (Specifies collection in which it should be inserted)
const Users = new mongoose.model("users", userSchema);

//validation for client input
function validateUser(user) {
  const schema = {
    name: joi
      .string()
      .min(1)
      .max(50)
      .required(),
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  };
  return joi.validate(user, schema);
}

exports.Users = Users;
exports.validateUser = validateUser;
