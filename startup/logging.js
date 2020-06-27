module.exports = function() {
    require("express-async-errors");
    const logger = require("./middleware/logger")

    process.on("uncaughtException", (err) => {
        logger.error(err.message, { metadata: err });
        process.exit(1);
    })

    process.on("unhandledRejection", (err) => {
        logger.error(err.message, { metadata: err });
        process.exit(1);
    })

    if (!config.get("jwtPrivateKey")) {
        console.error("FATAL ERROR : JWT PRIVATE KEY IS NOT DEFINED");
        process.exit(1);
    }
}