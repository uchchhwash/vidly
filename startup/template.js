const { template } = require("lodash");

const express = require("express");
module.exports = function(app) {
    app.set("view engine", "pug");
    app.set("views", "./views"); // default
    app.use(express.static("public"));
}