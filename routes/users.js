const { User, validate } = require("../models/user")
const express = require("express");
const { route } = require("./genres");
const router = express.Router();

router.get("/", async(req, res) => {
    const user = await User.find().sort("name");
    res.send(user);
})


module.exports = router;