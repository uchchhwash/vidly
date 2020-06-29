const express = require("express");
const router = express.Router();
const config = require("config");

router.get("/", (req, res) => {
    res.render("index", { title: config.get("name"), message: "Welcome To Vidly Rental Application" });
});

router.get("/api", (req, res) => {
    res.status(200).send({
            name: config.get("name"),
            version: config.get("version"),
            status: "SERVER IS UP & RUNNING"
        })
        // res.render("index", { title: "My Express App", message: "Hello" });
});

module.exports = router;