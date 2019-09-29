const mongoose = require("mongoose");
const { logger } = require("../logger");

//Connect to MongoDB 'vidlydb' database genres
module.exports = function() {
  mongoose
    .connect("mongodb://localhost/vidlydb", { useNewUrlParser: true })
    .then(() => logger.info("Connected to MongoDB database..."));
};
// .catch(err => console.log("Could not connect to MongoDB...", err)); // Let Winston handle the error
