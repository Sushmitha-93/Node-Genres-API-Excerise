const mongoose = require("mongoose");
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// Connect to mongoDB in index
// create Schema
// create model to call functions
// create validation function to validate client input to api
const userSchema = new mongoose.Schema({
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

/* Creating method for object. Here we are assigning function to a new proprty 'generateJwtAuthToken' 
   of Schema.methods object */
userSchema.methods.generateJwtAuthToken = function() {
  const token = jwt.sign({ id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

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
