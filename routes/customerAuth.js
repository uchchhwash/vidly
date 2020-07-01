const bcrypt = require("bcryptjs");
const Joi = require("joi");
const _ = require("lodash");
const { CustomerCredentials } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await CustomerCredentials.findOne({ email: req.body.email });
    if (!customer) return res.status(400).send("Invalid Email or Password");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Invalid Email or Password");

    const token = customer.generateAuthToken();

    res.send({ token: token });
})


function validate(req) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;