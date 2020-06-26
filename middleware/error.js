const logger = require("./logger")

module.exports = function(err, req, res, next) {

    console.log(err.message)
        // logger.error(err.message, err);
    res.status(500).send("Something Failed");
}