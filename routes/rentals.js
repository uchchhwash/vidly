const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

module.exports = router;