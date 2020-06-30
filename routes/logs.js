const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Log } = require("../models/log")
const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    const paginationLimit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const logs = await Log.find({})
        .skip((page - 1) * paginationLimit)
        .limit(parseInt(paginationLimit))
        .sort({ "timestamp": -1 });
    res.send(logs);
})

module.exports = router;