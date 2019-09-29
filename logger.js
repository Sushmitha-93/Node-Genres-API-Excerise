const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidlydb" })
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidlydb" })
  ]
});

exports.logger = logger;
