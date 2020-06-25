const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    const movies = await Movie.find().sort("name");
    res.send(movies);
})