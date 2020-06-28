const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {
    res.status(401).send("Unauthorized")
})

module.exports = router;