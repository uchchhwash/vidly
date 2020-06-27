const logger = require("../middleware/logger");
require("express-async-errors");
module.exports = function() {
    process.on("uncaughtException", (err) => {
        logger.error(err.message, { metadata: err });
        //process.exit(1);
    })

    process.on("unhandledRejection", (err) => {
        logger.error(err.message, { metadata: err });
        //process.exit(1);
    })
}