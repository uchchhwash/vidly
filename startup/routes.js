const express = require("express");
const auth = require("../routes/auth");
const customerAuth = require("../routes/customerAuth");
const users = require("../routes/users");
const returns = require("../routes/returns");
const rentals = require("../routes/rentals");
const movies = require("../routes/movies");
const customers = require("../routes/customers");
const genres = require("../routes/genres");
const logs = require("../routes/logs");
const home = require("../routes/home");
const error = require("../middleware/error");

module.exports = function(app) {
    app.use(express.json());
    app.use("/api/auth", auth);
    app.use("/api/customerAuth", customerAuth);
    app.use("/api/users", users);
    app.use("/api/returns", returns);
    app.use("/api/rentals", rentals);
    app.use("/api/movies", movies);
    app.use("/api/customers", customers);
    app.use("/api/genres", genres);
    app.use("/api/logs", logs);
    app.use("/", home);
    app.use(error);
}