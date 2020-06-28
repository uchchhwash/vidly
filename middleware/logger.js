const config = require("config");
const winston = require("winston");
const { createLogger, format } = require('winston');
const { combine, timestamp, metadata, printf, json, splat } = format;
(process.env.NODE_ENV !== "test") ? require("winston-mongodb"): null;

const logFormat = printf(({ level, message, timestamp }) => {
    return `Timestamp: ${timestamp}  Level: [${level}]  Message: ${message}`;
});

if (process.env.NODE_ENV !== "test") {
    module.exports = createLogger({
        format: combine(
            timestamp(),
            logFormat
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.MongoDB({ db: config.get("db"), metaKey: "metadata", options: { useUnifiedTopology: true } }),
            // new transports.File({ filename: "logfile.log", level: "error" }),
        ],
    });

} else {
    module.exports = createLogger({
        format: combine(
            timestamp(),
            logFormat
        ),
        transports: [
            new winston.transports.Console(),
        ],
    });
}