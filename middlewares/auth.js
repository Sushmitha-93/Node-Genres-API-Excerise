const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // If JWT is absent, send 401
  const token = req.header("x-jwttoken");
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
