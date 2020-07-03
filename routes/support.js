const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Support } = require("../models/support");
const express = require("express");
const router = express.Router();

router.get("/", auth, async(req, res) => {
    const support = await Support.find({});
    res.send(support);
})

router.post("/", auth, async(req, res) => {
    let support = new Support({
        user: auth.user,
        title: req.body.title,
        message: req.body.message,
        email: req.body.email
    });

    support = await support.save();
    res.send(support);
})


module.exports = router;