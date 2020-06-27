const logger = require("../middleware/logger")
const mongoose = require("mongoose");
const config = require("config");
module.exports = function() {
    const db = config.get("db");
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
        .then(() => logger.info(`Connected to ${db}...`));
}