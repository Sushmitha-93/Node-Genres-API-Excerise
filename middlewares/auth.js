const jwt = require("jsonwebtoken");
const config = require("config");

// AUTH MIDDLEWARE
// 1) Check if request has JWT token in it
// 2) if JWT is valid token, put payload to req.user
//    Token will have { _id: this._id, isAdmin: this.isAdmin } user information

module.exports = function(req, res, next) {
  // Get token from request header
  const token = req.header("x-jwttoken");

  // If JWT is absent, send 401 (Unauthorised)
  if (!token) return res.status(401).send("Access denied. No token provided");

  // Verify the token. If its wrong it throws error, so we should make sure to catch it
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
};
