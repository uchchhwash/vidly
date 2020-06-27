const logger = require("./middleware/logger")
const debug = require("debug")("app:startup");
const morgan = require("morgan");
const express = require("express");
const app = express();

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    // debug("Morgan enabled...");
}

require("./startup/logging")();
require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/template")(app);
require("./startup/optionalLib")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));