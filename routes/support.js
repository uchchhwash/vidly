const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Support } = require("../models/support")
const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    const support = await Support.find().sort("name");
    res.send(support);
})
module.exports = router;