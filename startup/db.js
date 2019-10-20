const mongoose = require("mongoose");
const { logger } = require("../logger");
const config = require("config");

//Connect to MongoDB 'vidlydb' database genres
module.exports = function() {
  const db = config.get("db");
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => logger.info(`Connected to ${db} MongoDB database...`));
};
// .catch(err => console.log("Could not connect to MongoDB...", err)); // Let Winston handle the error
