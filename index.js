require("express-async-errors");
const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const logger = require("./middleware/logger")

const express = require("express");
const app = express();

require("./startup/routes")(app)
require("./startup/db")();

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



// app.set("view engine", "pug");
// app.set("views", "./views"); // default


// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(helmet());


// Configuration
// console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    debug("Morgan enabled...");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));