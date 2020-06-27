const winston = require("winston");
const { transports, createLogger, format } = require('winston');
require("winston-mongodb");
const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.splat(),
        // format.prettyPrint()
    ),
    transports: [
        new transports.Console(),
        // new transports.File({ filename: "logfile.log", level: "error" }),
        new winston.transports.MongoDB({ db: "mongodb://localhost/vidly", metaKey: 'meta' })
    ],

});

module.exports = logger;