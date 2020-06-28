const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.post("/", auth, async(req, res) => {

})

module.exports = router;