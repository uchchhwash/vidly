const Joi = require("joi");
const moment = require("moment");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();


router.post("/", [auth, validate(validateReturn)], async(req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send("Return not found");
    if (rental.dateReturned) return res.status(400).send("Rental Return already processed");

    let dateDiff = moment(rental.dateReturned).diff(moment(rental.dateOut), "days")
    if (dateDiff === 0) dateDiff = 1;
    rental.dateReturned = new Date();
    rental.rentalFee = dateDiff * rental.movie.dailyRentalRate;
    await rental.save();
    const result = await Movie.findOneAndUpdate({ _id: rental.movie._id }, { $inc: { numberInStock: 1 } }, { new: true })
    return res.status(200).send(rental);
})

function validateReturn(req) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };

    return Joi.validate(req, schema);
}
module.exports = router;