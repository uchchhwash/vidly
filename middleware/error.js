const logger = require("./logger")

module.exports = function(err, req, res, next) {
    logger.error(err.message, { metadata: err });
    res.status(500).send("Something Failed");
}