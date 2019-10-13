const { createLogger, transports, format } = require("winston");
const { combine, timestamp, prettyPrint, colorize, json } = format;
require("winston-mongodb"); // if you want to log in mongodb using winston

// All logs gets logged on console and saved in a file "logs.log" and in MongoDB in "logs" collection
// So we have 3 transports - Console, File, MongoDB
// We have exception handler transports - to catch and log exceptions (Promise Rejection)
const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), prettyPrint()) // format options for console
    }),
    new transports.File({
      filename: "logs.log",
      format: combine(timestamp(), json()) // format options for log file
    }),
    new transports.MongoDB({ db: "mongodb://localhost/vidlydb" })
  ],
  exceptionHandlers: [
    new transports.Console({
      format: combine(colorize(), timestamp(), prettyPrint())
    }),
    new transports.File({
      filename: "logs.log",
      format: combine(timestamp(), json())
    }),
    new transports.MongoDB({ db: "mongodb://localhost/vidlydb" })
  ]
});

exports.logger = logger;
