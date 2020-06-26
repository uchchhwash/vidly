function log(req, res, next) {
    console.log('Logging...');
    next();
}

module.exports = log;

// const logger = winston.createLogger({
//   format: winston.format.combine(
//       winston.format.timestamp(),
//       winston.format.json(),
//       winston.format.errors(),
//       winston.format.metadata()
//   ),
//   transports: [
//       new winston.transports.File({ filename: 'logfile.log' }),
//       new winston.transports.Console()
//   ],
// });