const winston = require("winston");
const { transports, createLogger, format } = require('winston');
const { combine, timestamp, metadata, printf, json, splat } = format;
require("winston-mongodb");

const logFormat = printf(({ level, message, timestamp }) => {
    return `Timestamp: ${timestamp}  Level: [${level}]  Message: ${message}`;
});
const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.MongoDB({ db: "mongodb://localhost/vidly", metaKey: "metadata" }),
        // new transports.File({ filename: "logfile.log", level: "error" }),
    ],
});

module.exports = logger;