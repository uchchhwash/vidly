const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const fawn = require("fawn");
const express = require("express");
const Fawn = require("fawn/lib/fawn");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", auth, async(req, res) => {
    const rentals = await Rental.find({}).sort('-dateOut');
    res.send(rentals);
})

router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            email: customer.email
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();
    //two phase commit (transaction) implmentation using fawn
    try {
        new Fawn.Task()
            .save("rentals", rental)
            .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
            .run();
        res.send(rental);
    } catch (err) {
        res.status(500).send("Something Failed In The Server");
    }
});

router.get('/:id', auth, async(req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});

module.exports = router;