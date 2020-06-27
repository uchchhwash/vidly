module.exports = function() {
    const logger = require("../middleware/logger")

    process.on("uncaughtException", (err) => {
        console.log("uncaught call");
        logger.error(err.message, { metadata: err });
        // process.exit(1);
    })

    process.on("unhandledRejection", (err) => {
        logger.error(err.message, { metadata: err });
        // process.exit(1);
    })
}