const jwt = require("jsonwebtoken");
const config = require("config");

// ADMIN MIDDLEWARE
// 1) Check if JWT has isAdmin=true, else send 403 (Forbidden)

module.exports = function(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access Denied");

  next();
};
