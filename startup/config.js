const config = require("config");

// Before we start the server - We must ensure below environment variable is set, otherwise exit
module.exports = function() {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: Env var vidly_jwtPrivateKey not set");
  }
};
