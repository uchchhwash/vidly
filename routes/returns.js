const { Rental } = require("../models/rental");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.post("/", auth, async(req, res) => {
    if (!req.body.customerId) return res.status(400).send("customerId not provided")
    if (!req.body.movieId) return res.status(400).send("movieId not provided")

    const rental = await Rental.findOne({
        "customer._id": req.body.customerId,
        "movie._id": req.body.movieId
    });
    if (!rental) return res.status(404).send("Return not found");
    if (rental.dateReturned) return res.status(400).send("Rental Return already processed");

    rental.dateReturned = new Date();
    await rental.save();
    return res.status(200).send();
})

module.exports = router;