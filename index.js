const morgan = require("morgan");
const express = require("express");
const logger = require("./middleware/logger");
const app = express();
require("./startup/config")();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

// const debug = require("debug")("app:startup");

// const helmet = require("helmet");
// app.set("view engine", "pug");
// app.set("views", "./views"); // default

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(helmet());
// throw new Error("faltu erroe")
// Configuration
// console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    // debug("Morgan enabled...");
}
const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));